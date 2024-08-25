import React from 'react';

import {Box, Text} from 'ink';
import Spinner from 'ink-spinner';
import {FileFinderResponse} from '../@types/file-finder.js';

type LogInfoProps = {
	response?: FileFinderResponse | null;
	searching: boolean;
};

export const LogInfo: React.FC<LogInfoProps> = ({response, searching}) =>
	!response ? null : (
		<Box marginBottom={1}>
			{searching && (
				<Box marginRight={1}>
					<Spinner type="dots" />
				</Box>
			)}
			<Text>
				Read{' '}
				<Text
					bold={response.total > 0}
					color={response.total > 0 ? 'yellow' : 'green'}
				>
					{response.total}
				</Text>{' '}
				file{response.total !== 1 && 's'}, found{' '}
				<Text
					bold={response.duplicates > 0}
					color={response.duplicates > 0 ? 'red' : 'green'}
				>
					{response.duplicates}
				</Text>{' '}
				duplicates
			</Text>
		</Box>
	);
