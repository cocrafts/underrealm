interface Configs {
	REGION: string;
	SERVICE_NAME: string;
	STAGE: string;
	PORT: number;
	IS_LAMBDA: boolean;
	MONGO_URI: string;
	REDIS_URI: string;
}

const defaultConfigs: Configs = {
	STAGE: 'local',
	REGION: 'ap-northeast-1',
	SERVICE_NAME: 'metacraft-api',
	PORT: 3005,
	IS_LAMBDA: false,
	MONGO_URI: 'mongodb://localhost:27017/underrealm',
	REDIS_URI: 'redis://localhost',
};

export let configs: Configs = {
	...defaultConfigs,
	...(process.env as never as Configs),
};

export const overrideConfigs = (val: Partial<Configs>) => {
	configs = { ...configs, ...val };
};
