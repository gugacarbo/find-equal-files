import * as path from 'path';

export const absolutePath = (dir: string) =>
	path.resolve(
		dir.startsWith('/') || dir.startsWith('\\')
			? path.join(process.cwd(), dir)
			: dir,
	);
