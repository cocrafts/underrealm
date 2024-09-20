import type { SSTConfig } from 'sst';

import launcher from './tools/stacks/launcher';

export default {
	config() {
		return {
			name: 'under-realm',
			region: 'ap-south-1',
		};
	},
	stacks(app) {
		app.stack(launcher);
	},
} satisfies SSTConfig;
