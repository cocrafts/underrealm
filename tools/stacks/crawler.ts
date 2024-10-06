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
		copyFiels: [{ from: 'credentials.json', to: './credentials.json' }],
	});

	new Cron(stack, 'DataCrawlerCronJob', {
		schedule: 'rate(1 minute)', // trigger this job every day at 0:00:00Z
		job: crawler,
	});
};
