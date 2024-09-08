interface Configs {
	REGION?: string;
	SERVICE_NAME?: string;
	STAGE?: string;
	IS_LAMBDA?: boolean;
	REDIS_URI?: string;
}

export let configs: Configs = (process.env as Configs) || {};

export const setConfigs = (val: Partial<Configs>) => {
	configs = { ...configs, ...val };
};
