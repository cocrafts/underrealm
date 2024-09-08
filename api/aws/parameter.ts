import type { GetParameterCommandOutput } from '@aws-sdk/client-ssm';
import { GetParameterCommand, SSMClient } from '@aws-sdk/client-ssm';

import { regionConfig } from './utils';

export const client = new SSMClient(regionConfig);

interface ParameterCache {
	response: GetParameterCommandOutput;
	timestamp: Date;
}

const parameterCache: Record<string, ParameterCache> = {};

/* WARNING: this cache layer could cause certain problem once the Parameter get update */
export const getParameter = async (
	Name: string,
	WithDecryption = true,
	cacheExpiration: number = 1000 * 120, // 2 minutes TTL cache
): Promise<GetParameterCommandOutput> => {
	const cached = parameterCache[Name];

	if (new Date().getTime() - cached?.timestamp?.getTime() < cacheExpiration) {
		return Promise.resolve(parameterCache[Name].response);
	}

	const command = new GetParameterCommand({
		Name,
		WithDecryption,
	});

	const response = await client.send(command);
	parameterCache[Name] = { response, timestamp: new Date() };

	return response;
};
