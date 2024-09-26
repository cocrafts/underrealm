import dotenv from 'dotenv';

import { constructDomainName, zoneId } from './shared';

dotenv.config({ path: `launcher/.env.${$app.stage}` });

const domainName = constructDomainName('launcher', $app.stage);

const launcher = new sst.aws.StaticSite('launcher', {
	path: 'launcher',
	build: {
		command: `yarn build --envFile .env.${$app.stage}`,
		output: 'metacraft',
	},
	domain: {
		name: domainName,
		redirects: $app.stage === 'production' ? [`www.${domainName}`] : undefined,
		dns: sst.aws.dns({ zone: zoneId }),
	},
});

export { launcher };
