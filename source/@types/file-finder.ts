type ProgressCallback = ({
	fileCount,
}: {
	fileCount: number;
	duplicatesCount: number;
}) => void;

type FileFinderMode = 'deep' | 'shallow' | 'by-name';

export interface FileFinderResponse {
	duplicates: number;
	total: number;
	hashes: {[hash: string]: string[]};
}

export interface FileFinderProps {
	dir: string;
	mode?: FileFinderMode;
	onProgress: ProgressCallback;
	onEnd?: (response: FileFinderResponse) => void;
}
