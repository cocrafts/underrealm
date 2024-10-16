import dotenv from 'dotenv';

import { DBEnvs, defaultEnvs, defaultLambdaConfigs, GCPEnvs } from './shared';

dotenv.config({ path: `api/.env.${$app.stage}` });

const crawler = new sst.aws.Function('data-crawler', {
	...defaultLambdaConfigs($app.stage),
	handler: 'api/functions/crawler.handler',
	environment: { ...defaultEnvs(), ...DBEnvs(), ...GCPEnvs() },
});

const cron = new sst.aws.Cron('WeeklyCrawlerSchedule', {
	job: crawler.arn,
	schedule: 'cron(0 0 ? * 2 *)', // trigger this job every monday at 0:00:00Z
});
export { cron };
