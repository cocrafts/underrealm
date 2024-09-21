// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

import { constructAPI } from './tools/infra/api';
import { constructLauncher } from './tools/infra/launcher';
import { constructWebsocketAPI } from './tools/infra/websocket';

export default $config({
	app(input) {
		return {
			name: 'underrealm',
			removal: input?.stage === 'production' ? 'retain' : 'remove',
			home: 'aws',
			providers: { aws: { profile: 'metacraft', region: 'ap-south-1' } },
		};
	},
	async run() {
		const API = constructAPI();
		const wsAPI = constructWebsocketAPI();
		const launcher = constructLauncher();

		return {
			web: launcher.url,
			api: API.url,
			ws: wsAPI.url,
		};
	},
});
