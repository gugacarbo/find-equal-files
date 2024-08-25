import React from 'react';

import {Box, Text} from 'ink';
import Spinner from 'ink-spinner';

export type Log = {
	fileCount: number;
	duplicatesCount: number;
};

type LogInfoProps = {
	log: Log;
	searching: boolean;
};

export const LogInfo: React.FC<LogInfoProps> = ({log, searching}) => (
	<Box marginBottom={1}>
		{searching && (
			<Box marginRight={1}>
				<Spinner type="dots" />
			</Box>
		)}
		<Text>
			Read{' '}
			<Text
				bold={log.fileCount > 0}
				color={log.fileCount > 0 ? 'yellow' : 'green'}
			>
				{log.fileCount}
			</Text>{' '}
			file{log.fileCount !== 1 && 's'}, found{' '}
			<Text
				bold={log.duplicatesCount > 0}
				color={log.duplicatesCount > 0 ? 'red' : 'green'}
			>
				{log.duplicatesCount}
			</Text>{' '}
			duplicates
		</Text>
	</Box>
);
