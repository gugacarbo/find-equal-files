import React from 'react';
import test from 'ava';
import {render} from 'ink-testing-library';
import App from '../../app.js';

test('App Render', t => {
	const {lastFrame} = render(<App path="/test/data" />);
	const frame = lastFrame();
	t.assert((frame?.indexOf('/test/data') ?? -1) >= 0);
});
