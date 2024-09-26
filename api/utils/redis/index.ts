import { createClient } from 'redis';
import { configs } from 'utils/config';
import { logger } from 'utils/logger';

export const redis = createClient({ url: configs.REDIS_URI });

redis.on('error', (err) => logger.error('Redis Client Error', err));

redis.on('connect', () => {
	logger.info('Redis connected');
});

redis.on('disconnect', () => {
	logger.warn('Redis disconnected');
});
