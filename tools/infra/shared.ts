export const baseDomainName = 'underrealm.io';
export const hostedZone = 'underrealm.io';
export const zoneId = 'Z0837301F5UFZQG04XEQ';

const stageAlias: Record<string, string> = {
	production: ' ',
	staging: 'staging',
	development: 'dev',
};

const siteAlias = {
	launcher: ' ',
	api: 'api',
	websocket: 'ws',
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
};

const logGroups = {
	production: '/underrealm/production',
	staging: '/underrealm/staging',
	development: '/underrealm/development',
};

export const defaultLambdaConfigs = (
	stage: string,
): Omit<sst.aws.FunctionArgs, 'handler'> => {
	const logGroup = logGroups[stage] || `/underrealm/shared`;

	return {
		architecture: 'arm64',
		runtime: 'nodejs20.x',
		logging: {
			format: 'json',
			logGroup,
		},
		nodejs: {
			esbuild: {
				resolveExtensions: ['.lambda.ts', '.lambda.js', '.ts', '.js', '.json'],
			},
		},
	};
};

export const defaultEnvs = () => {
	return {
		RUNTIME: 'lambda',
		...getEnvsObjectByKeys(['STAGE', 'NODE_ENV']),
	};
};

export const DBEnvs = () => {
	return getEnvsObjectByKeys(['MONGO_URI', 'REDIS_URI']);
};

export const GCPEnvs = () =>{
	return getEnvsObjectByKeys(['GCP_SERVICE_ACCOUNT']);
}

export const JWTEnvs = (type: 'all' | 'private' | 'public' = 'public') => {
	if (type === 'all') {
		return getEnvsObjectByKeys(['GAME_JWT_PUBLIC_KEY', 'GAME_JWT_PRIVATE_KEY']);
	} else if (type === 'public') {
		return getEnvsObjectByKeys(['GAME_JWT_PUBLIC_KEY']);
	} else if (type === 'private') {
		return getEnvsObjectByKeys(['GAME_JWT_PRIVATE_KEY']);
	}
};

export const getEnvsObjectByKeys = (keys: string[]) => {
	const envs: Record<string, string> = {};

	for (const key of keys) {
		if (!process.env[key]) throw Error(`require env variable: ${key}`);
		envs[key] = process.env[key];
	}

	return envs;
};

export const getEnvsObjectByPrefix = (prefix: string) => {
	const envs: Record<string, string> = {};

	for (const key in process.env) {
		if (key.startsWith(prefix) && process.env[key]) {
			envs[key] = process.env[key];
		}
	}

	return envs;
};
