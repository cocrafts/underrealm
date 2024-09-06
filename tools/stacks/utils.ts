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
