import type { SSTConfig } from 'sst';

import launcher from './tools/stacks/launcher';
import { crawler } from './tools/stacks/crawler';
import { functionDefaultProps } from './tools/stacks/shared';

export default {
	config() {
		return {
			name: 'under-realm',
			region: 'ap-south-1',
		};
	},
	stacks(app) {
		app.stack(launcher);
		app.setDefaultFunctionProps(functionDefaultProps);
		app.stack(crawler);
	},
} satisfies SSTConfig;
