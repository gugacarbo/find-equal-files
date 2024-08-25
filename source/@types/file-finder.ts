type FileFinderMode = 'deep' | 'shallow' | 'by-name';

export interface FileFinderResponse {
	duplicates: number;
	total: number;
	hashes: {[hash: string]: string[]};
}

type ProgressCallback = (response: FileFinderResponse) => void;

export interface FileFinderProps {
	dir: string;
	mode?: FileFinderMode;
	onProgress: ProgressCallback;
	onEnd?: (response: FileFinderResponse) => void;
}
