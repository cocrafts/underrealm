#!/usr/bin/env node

import yargs from 'yargs/yargs';

import { questCommand } from './quest';

yargs(process.argv.slice(2))
	.command(questCommand)
	.help()
	.alias('help', 'h')
	.alias('version', 'v')
	.parse();
