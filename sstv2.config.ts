import type { SSTConfig } from 'sst';

import { crawler } from './tools/stacks/crawler';
import launcher from './tools/stacks/launcher';
import { functionDefaultProps } from './tools/stacks/shared';

export default {
	config() {
		return {
			name: 'under-realm',
			region: 'ap-south-1',
		};
	},
	stacks(app) {
		app.setDefaultFunctionProps(functionDefaultProps);
		app.stack(crawler);
		app.stack(launcher);
	},
} satisfies SSTConfig;
