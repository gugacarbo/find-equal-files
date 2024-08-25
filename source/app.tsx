import React, {useEffect, useState} from 'react';
import {Box, useApp, useInput} from 'ink';
import {findDuplicateFiles} from './file-finder/index.js';

import {FileFinderResponse} from './@types/file-finder.js';
import {Header} from './components/header.js';
import {Error} from './components/error.js';
import {LogInfo} from './components/result-log.js';
import {parsePath} from './lib/parse-path.js';
import {HashesList} from './components/hashes-list.js';
import {absolutePath} from './lib/absolute-path.js';

type Props = {
	path?: string;
};

const App: React.FC<Props> = ({path = process.cwd()}) => {
	const {exit} = useApp();

	const [searching, setSearching] = useState(true);
	const [showPaths, setShowPaths] = useState(false);

	const [exiting, setExiting] = useState(false);

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
			onProgress: fileCount => setResponse(fileCount),
			onEnd: response => {
				setResponse(response);
				setSearching(false);
			},
		}).catch(err => setError(err));
	}, [path]);

	const reducedPath = parsePath(absolutePath(path));

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
			<LogInfo response={response} searching={searching} />
			<HashesList
				setError={err => setError(err)}
				showPaths={showPaths}
				response={response}
				searching={searching}
			/>
		</Box>
	);
};

export default App;
