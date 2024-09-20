import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	overwrite: true,
	schema: 'http://localhost:3005/graphql',
	documents: [
		'launcher/utils/graphql/query/*.ts',
		'launcher/utils/graphql/mutation/*.ts',
	],
	generates: {
		'./schema.graphql': {
			plugins: ['schema-ast'],
		},
		'./api/types/graphql.ts': {
			plugins: ['typescript', 'typescript-resolvers'],
			config: {
				useIndexSignature: true,
				contextType: '../utils/runtime#ApiContext',
			},
		},
		'./launcher/utils/graphql/sdk.ts': {
			plugins: [
				'typescript',
				'typescript-operations',
				'typescript-react-apollo',
			],
		},
	},
};

export default config;
