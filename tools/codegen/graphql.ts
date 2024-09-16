import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	overwrite: true,
	schema: 'http://localhost:3005/graphql',
	generates: {
		'./api/types/graphql.ts': {
			plugins: ['typescript', 'typescript-resolvers'],
			config: {
				useIndexSignature: true,
				contextType: '../utils/runtime#ApiContext',
			},
		},
		'./launcher/utils/types/graphql.ts': {
			plugins: ['typescript', 'typescript-resolvers'],
			config: {
				useIndexSignature: true,
			},
		},
	},
};

export default config;
