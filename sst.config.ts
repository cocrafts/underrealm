// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
	app(input) {
		return {
			name: 'underrealm',
			removal: input?.stage === 'production' ? 'retain' : 'remove',
			home: 'aws',
			providers: {
				aws: {
					profile: process.env.PROFILE || 'metacraft',
					region: 'ap-south-1',
				},
			},
		};
	},
	async run() {
		import('./tools/infra/api');
		import('./tools/infra/websocket');
		import('./tools/infra/launcher');
		import('./tools/infra/crawler');
	},
});
