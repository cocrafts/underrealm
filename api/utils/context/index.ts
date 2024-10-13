import type { ContextFunction } from '@apollo/server';
import type { ExpressContextFunctionArgument } from '@apollo/server/dist/esm/express4';
import type { ResolverFn } from 'utils/types';

import type { ApiContext } from './graphql';

export * from './graphql';

export const graphqlContext: ContextFunction<
	[ExpressContextFunctionArgument],
	ApiContext
> = async ({ req }) => {
	const authHeader: string = req?.headers['authorization'];
	const nonce: string = Array.isArray(req?.headers['nonce'])
		? req.headers['nonce'][0] // If it's an array, take the first element
		: req?.headers['nonce'] || '';
	return { nonce: nonce, auth: authHeader };
};

export const requiredChain = <TResult, TParent, TArgs>(
	middlewares: Array<
		(
			resolver: ResolverFn<TResult, TParent, ApiContext, TArgs>,
		) => ResolverFn<TResult, TParent, ApiContext, TArgs>
	>,
	resolver: ResolverFn<TResult, TParent, ApiContext, TArgs>, // The original resolver
): ResolverFn<TResult, TParent, ApiContext, TArgs> => {
	return async (root, args, context, info) => {
		let wrappedResolver = resolver;

		// Apply each middleware to the resolver in sequence
		for (let i = middlewares.length - 1; i >= 0; i--) {
			wrappedResolver = middlewares[i](wrappedResolver);
		}

		// Execute the final wrapped resolver
		return await wrappedResolver(root, args, context, info);
	};
};
