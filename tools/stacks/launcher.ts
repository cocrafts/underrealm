import type { StackContext } from 'sst/constructs';
import { StaticSite } from 'sst/constructs';

import { constructDomainName, hostedZone, loadEnvsFromStage } from './shared';

export const launcher = ({ stack, app }: StackContext): void => {
	loadEnvsFromStage(app.stage);

	const domainName = constructDomainName("launcher", app.stage);

	const site = new StaticSite(stack, 'site', {
		buildCommand: 'metacraft bundle',
		buildOutput: 'metacraft',
		customDomain: { domainName, hostedZone },
	});

	stack.addOutputs({
		siteUrl: site.url,
		siteDomain: domainName,
	});
};

export default launcher;

