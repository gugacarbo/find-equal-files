import React, {useState} from 'react';
import {Select} from '@inkjs/ui';
import {Box, Text} from 'ink';
import {FileFinderResponse} from '../@types/file-finder.js';
import {DuplicatedFilesList} from './duplicated-list.js';
import * as path from 'path';
import chalk from 'chalk';

type HashesListProps = {
	showPaths: boolean;
	setError: (error: {message: string; name: string} | null) => void;
	response: FileFinderResponse | null | undefined;
	searching: boolean;
};

export const HashesList: React.FC<HashesListProps> = ({
	showPaths,
	response,
	setError,
	searching,
}) => {
	const [selected, setSelected] = useState<string | null>(null);

	const duplicated = Object.entries(response?.hashes || {})
		.filter(([_, paths]) => paths.length > 1)
		.map(([hash, paths]) => ({
			label: showPaths
				? ` ${paths[0]} - (${chalk.yellow(paths.length)})`
				: `${hash.slice(0, 4)}...${path.basename(
						paths?.[0] ?? '',
				  )} - (${chalk.yellow(paths.length)})`,
			value: hash,
		}));

	return searching ? null : (
		<Box flexDirection="column" gap={1}>
			{selected && (
				<Text>
					Press{' '}
					<Text color="yellow" bold>
						B / bksp
					</Text>{' '}
					to go back to the list
				</Text>
			)}
			<Text bold>
				Press <Text color="green">Enter</Text> to{' '}
				{!selected ? 'see files' : 'open directory'}
			</Text>
			{!selected ? (
				<Select options={duplicated} onChange={item => setSelected(item)} />
			) : (
				<DuplicatedFilesList
					setError={setError}
					duplicated={response?.hashes[selected] || []}
					showPaths={showPaths}
				/>
			)}
		</Box>
	);
};
