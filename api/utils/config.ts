import dotenv from 'dotenv';

dotenv.config();

interface Configs {
	RUNTIME: 'lambda' | 'local';
	REGION: string;
	SERVICE_NAME: string;
	STAGE: string;
	PORT: number;
	MONGO_URI: string;
	REDIS_URI: string;
	GAME_JWT_PUBLIC_KEY: string;
	GAME_JWT_PRIVATE_KEY: string;
}

const defaultConfigs: Configs = {
	RUNTIME: 'local',
	STAGE: 'local',
	REGION: 'ap-south-1',
	SERVICE_NAME: 'metacraft-api',
	PORT: 3005,
	MONGO_URI: 'mongodb://localhost:27017/underrealm',
	REDIS_URI: 'redis://localhost',
	GAME_JWT_PUBLIC_KEY: '',
	GAME_JWT_PRIVATE_KEY: '',
};

export let configs: Configs = {
	...defaultConfigs,
	...(process.env as never as Configs),
};

export const overrideConfigs = (val: Partial<Configs>) => {
	configs = { ...configs, ...val };
};
