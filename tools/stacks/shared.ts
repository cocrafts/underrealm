import dotenv from 'dotenv';
import type { FunctionProps } from 'sst/constructs';

export const baseDomainName = 'underrealm.io';
export const hostedZone = 'underrealm.io';

const stageAlias: Record<string, string> = {
	production: ' ',
	staging: 'staging',
	development: 'dev',
};

const siteAlias = {
	launcher: ' ',
};

export const constructDomainName = (
	site: keyof typeof siteAlias,
	stage: string,
) => {
	const stagePrefix = (stageAlias[stage] || `${stage}`).trim();
	const sitePrefix = (siteAlias[site] || site).trim();
	const domainName = [stagePrefix, sitePrefix, baseDomainName]
		.filter(Boolean)
		.join('.');

	console.log('Domain', domainName);

	return domainName;
export const loadEnvsFromStage = (stage: string): void => {
	dotenv.config({ path: `api/.env.${stage}` });
};

export const functionDefaultProps: Partial<FunctionProps> = {
	architecture: 'arm_64',
	runtime: 'nodejs20.x',
	nodejs: {
		esbuild: {
			resolveExtensions: ['.lambda.ts', '.lambda.js', '.ts', '.js', '.json'],
		},
	},
};
