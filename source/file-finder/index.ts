import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import {FileFinderProps, FileFinderResponse} from '../@types/file-finder.js';
import {absolutePath} from '../lib/absolute-path.js';

function getFileHash(filePath: string): Promise<string> {
	return new Promise((resolve, reject) => {
		const hash = crypto.createHash('sha256');
		const stream = fs.createReadStream(filePath);

		stream.on('data', data => hash.update(data));
		stream.on('end', () => resolve(hash.digest('hex')));
		stream.on('error', err => reject(err));
	});
}

export async function findDuplicateFiles({
	dir,
	onProgress,
	onEnd,
}: FileFinderProps): Promise<FileFinderResponse> {
	const fileHashes: {[hash: string]: string[]} = {};
	const duplicates: string[] = [];
	let fileCount = 0;

	async function traverseDirectory(currentPath: string) {
		const files = fs.readdirSync(currentPath);

		for (const file of files) {
			const fullPath = path.join(currentPath, file);
			const stat = fs.statSync(fullPath);

			if (stat.isDirectory()) {
				await traverseDirectory(fullPath);
			} else if (stat.isFile()) {
				fileCount++;
				onProgress({
					duplicates: duplicates.length,
					total: fileCount,
					hashes: fileHashes,
				});
				const hash = await getFileHash(fullPath);

				if (fileHashes[hash]) {
					fileHashes[hash].push(fullPath);
					if (fileHashes[hash].length === 2) {
						duplicates.push(...fileHashes[hash]);
					} else {
						duplicates.push(fullPath);
					}
				} else {
					fileHashes[hash] = [fullPath];
				}
			}
		}
		onProgress({
			duplicates: duplicates.length,
			total: fileCount,
			hashes: fileHashes,
		});
	}
	const dirPath = absolutePath(dir);

	await traverseDirectory(dirPath);

	onEnd?.({
		duplicates: duplicates.length,
		total: fileCount,
		hashes: fileHashes,
	});
	return {duplicates: duplicates.length, total: fileCount, hashes: fileHashes};
}
