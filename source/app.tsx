import React, {useEffect, useState} from 'react';
import {Box, useApp, useInput} from 'ink';
import {findDuplicateFiles} from './file-finder/index.js';

import {FileFinderResponse} from './@types/file-finder.js';
import {Header} from './components/header.js';
import {Error} from './components/error.js';
import {Log, LogInfo} from './components/result-log.js';
import {parsePath} from './lib/parse-path.js';
import {HashesList} from './components/hashes-list.js';

type Props = {
	path?: string;
};

const App: React.FC<Props> = ({path = process.cwd()}) => {
	const {exit} = useApp();

	const [searching, setSearching] = useState(true);
	const [showPaths, setShowPaths] = useState(false);

	const [exiting, setExiting] = useState(false);

	const [log, setLog] = useState<Log>({fileCount: 0, duplicatesCount: 0});
	const [response, setResponse] = useState<FileFinderResponse | null>();

	const [error, setError] = useState<{
		message: string;
		name: string;
	} | null>();

	useInput(input => {
		if (exiting) {
			if (input === 'y') {
				setError({
					message: 'Exiting',
					name: 'exit',
				});
				setTimeout(() => {
					exit();
				}, 100);
			} else {
				setExiting(false);
			}
		}

		if (input === 'q' && !exiting) {
			setExiting(true);
		}
		if (input === 'c') {
			setError(null);
		}
		if (input === 's') {
			setShowPaths(!showPaths);
		}
	});

	useEffect(() => {
		findDuplicateFiles({
			dir: path,
			onProgress: fileCount => setLog(fileCount),
			onEnd: response => {
				setResponse(response);
				setLog({
					fileCount: response.total,
					duplicatesCount: response.duplicates,
				});
				setSearching(false);
			},
		}).catch(err => setError(err));
	}, [path]);

	const reducedPath = parsePath(path);

	return (
		<Box width="100%" flexDirection="column">
			<Header
				exiting={exiting}
				showPaths={showPaths}
				searching={searching}
				duplicatedCount={response?.duplicates ?? 0}
				reducedPath={reducedPath}
				error={error?.message}
			/>
			<Error message={error?.message} />
			<LogInfo log={log} searching={searching} />
			{!searching && (
				<HashesList
					setError={err => setError(err)}
					showPaths={showPaths}
					response={response}
				/>
			)}
		</Box>
	);
};

export default App;
