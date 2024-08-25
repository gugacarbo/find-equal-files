import {exec} from 'child_process';
import * as path from 'path';

export async function openDir(
	toPath: string,
	onError?: (error: Error | null) => void,
): Promise<boolean> {
	const dirPath = path.dirname(
		toPath.startsWith('/') || toPath.startsWith('\\')
			? path.join(process.cwd(), toPath)
			: path.join(toPath),
	);

	let command: string;

	switch (process.platform) {
		case 'win32':
			command = `start "" "${dirPath}"`;
			break;
		case 'darwin':
			command = `open "${dirPath}"`;
			break;
		case 'linux':
			command = `xdg-open "${dirPath}"`;
			break;
		default:
			onError?.({
				name: 'UnsupportedPlatform',
				message: "Can't Open - Unsupported platform",
			});
			return false;
	}

	exec(command, err => {
		onError?.(err);
		return false;
	});
	return true;
}
