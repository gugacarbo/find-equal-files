import React from 'react';
import chalk from 'chalk';
import test from 'ava';
import {render} from 'ink-testing-library';
import App from '../source/app.ts';

test('greet unknown user', t => {
	const {lastFrame} = render(<App path={undefined} />);

	// t.is(lastFrame(), `Hello, ${chalk.green('Stranger')}`);
	t.snapshot(lastFrame());
});

// test('greet user with a path', t => {
// 	const {lastFrame} = render(<App path="Jane" />);

// 	t.is(lastFrame(), `Hello, ${chalk.green('Jane')}`);
// });
