import React from 'react';
import {Box, Text} from 'ink';

export function Error({message}: {message?: string}) {
	if (!message) return null;
	return (
		<Box marginY={1}>
			<Text bold color="white" backgroundColor="red">
				{' '}
				{message}{' '}
			</Text>
		</Box>
	);
}
