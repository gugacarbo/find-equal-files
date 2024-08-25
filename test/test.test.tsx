import React from 'react';
import test from 'ava';
import {render} from 'ink-testing-library';
import {Box, Text} from 'ink';

test('JSX Test', t => {
	const {lastFrame} = render(
		<Box>
			<Text>test</Text>
		</Box>,
	);

	t.snapshot(lastFrame());
});
