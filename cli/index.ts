#!/usr/bin/env node

import yargs from 'yargs/yargs';

import { inventoryCommand } from './inventory';
import { questCommand } from './quest';

yargs(process.argv.slice(2))
	.command(questCommand)
	.command(inventoryCommand)
	.help()
	.alias('help', 'h')
	.alias('version', 'v')
	.parse();
