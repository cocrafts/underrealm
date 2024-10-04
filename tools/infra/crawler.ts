import dotenv from 'dotenv';

import { DBEnvs, defaultEnvs, defaultLambdaConfigs } from './shared';

dotenv.config({ path: `api/.env.${$app.stage}` });

const crawler = new sst.aws.Function('crawler', {
	...defaultLambdaConfigs($app.stage),
	handler: 'api/functions/crawler.handler',
	environment: { ...defaultEnvs(), ...DBEnvs() },
});

const cron = new sst.aws.Cron('WeeklyCrawlerSchedule', {
	job: crawler.arn,
	schedule: 'rate(7 days)', // AWS Schedule Expression for 1 time per week
});
export { cron };

// TODO: check if this deployment is worked
// TODO: pin Tan for service account file
