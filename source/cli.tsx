#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import App from './app.js';
import chalk from 'chalk';


const cli = meow(
	`${chalk.bold('Usage')}

In current directory:
${chalk.bold.green('$')} ${chalk.bold.yellow('find-equal-files')}

In specific directory:
${chalk.bold.green('$')} ${chalk.bold.yellow(
		'find-equal-files',
	)} ${chalk.bold.blue('--path')} ${chalk.bold.cyan('C:/.../path')}
		`,
	{
		importMeta: import.meta,
		flags: {
			path: {
				type: 'string',
			},
		},
	},
);

render(<App path={cli.flags.path} />);
