import React from 'react';

import {Box, Text} from 'ink';

type HeaderProps = {
	searching: boolean;
	duplicatedCount: number;
	reducedPath: string;
	error?: string | null;
	showPaths: boolean;
	exiting: boolean;
};

export const Header: React.FC<HeaderProps> = ({
	searching,
	duplicatedCount,
	reducedPath,
	error,
	showPaths,
	exiting,
}) => (
	<Box
		borderColor="magenta"
		width="100%"
		alignItems="flex-start"
		paddingX={1}
		borderStyle="single"
		justifyContent="space-between"
		flexDirection="column"
		columnGap={2}
	>
		<Box flexWrap="wrap">
			<Text bold>
				{searching ? (
					'Searching for'
				) : (
					<Text color={duplicatedCount > 1 ? 'yellow' : ''}>
						Found {duplicatedCount}
					</Text>
				)}{' '}
				Duplicated Files
			</Text>
			<Box paddingY={0.5} paddingX={1}>
				<Text bold>in </Text>
				<Text color="blue" bold wrap="truncate">
					{reducedPath}
				</Text>
			</Box>
		</Box>
		<Box flexDirection="column">
			{!searching && duplicatedCount > 0 && (
				<Text bold>
					Press <Text color={showPaths ? 'yellow' : 'green'}>S</Text> to{' '}
					{showPaths ? 'hide' : 'show'} paths
				</Text>
			)}
			{error && !exiting && (
				<Text bold>
					Press <Text color="red">C</Text> to clear{' '}
					<Text color="redBright">error</Text>
				</Text>
			)}
			<Text bold>
				Press{' '}
				{exiting ? (
					<Text color="yellow" bold>
						Y
					</Text>
				) : (
					<Text color="red">Q</Text>
				)}{' '}
				to
				{exiting && ' Confirm'}
				<Text color={exiting ? 'yellow' : 'redBright'}> Exit</Text>
			</Text>
		</Box>
	</Box>
);
