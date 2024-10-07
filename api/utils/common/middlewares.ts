import { parse } from 'graphql';

import { logger } from '../../utils/logger';

export const GraphQLLoggingMiddleware = () => {
	return (req, res, next) => {
		const operation = parse(req.body.query);
		if (req.url.startsWith('/graphql')) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const def = operation.definitions[0] as any;
			logger.info(`GraphQL Query: ${def?.name?.value}`);
		}

		next();
	};
};
