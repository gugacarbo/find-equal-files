import React from 'react';
import test from 'ava';
import {render} from 'ink-testing-library';
import {Box, Text} from 'ink';
import {TestComponent} from '../../source/components/component.js';

test('TSX', t => {
	const {lastFrame} = render(
		<Box>
			<Text>test</Text>
		</Box>,
	);

	t.snapshot(lastFrame());
});

test('TSX Component', t => {
	const {lastFrame} = render(<TestComponent />);

	t.snapshot(lastFrame());
});
