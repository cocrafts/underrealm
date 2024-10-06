import type { StackContext } from 'sst/constructs';
import { Cron, Function } from 'sst/constructs';

import { DBEnvs, defaultEnvs, GCPEnvs } from '../infra/shared';

import { loadEnvsFromStage } from './shared';

export const crawler = ({ stack, app }: StackContext): void => {
	loadEnvsFromStage(app.stage);

	const crawler = new Function(stack, 'data-crawler', {
		handler: 'api/functions/crawler.handler',
		environment: {
			...defaultEnvs(),
			...DBEnvs(),
			...GCPEnvs(),
		},
	});

	new Cron(stack, 'DataCrawlerCronJob', {
		schedule: 'cron(0 0  ? * 2 *)',
		job: crawler,
	});
};
