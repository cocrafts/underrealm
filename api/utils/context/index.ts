import type { ContextFunction } from '@apollo/server';
import type { ExpressContextFunctionArgument } from '@apollo/server/dist/esm/express4';

import type { ApiContext } from './graphql';
import { resolveUniversalContext } from './graphql';

export * from './graphql';

export const graphqlContext: ContextFunction<
	[ExpressContextFunctionArgument],
	ApiContext
> = async ({ req }) => {
	const authHeader: string = req?.headers['authorization'];
	return resolveUniversalContext({ authHeader });
};
