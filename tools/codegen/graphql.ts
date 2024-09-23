import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	overwrite: true,
	schema: 'http://localhost:3005/graphql',
	documents: [
		'launcher/utils/graphql/query/*.ts',
		'launcher/utils/graphql/mutation/*.ts',
		'launcher/utils/graphql/subscription/*.ts',
	],
	generates: {
		'./schema.graphql': {
			plugins: ['schema-ast'],
		},
		'./api/utils/types/graphql.ts': {
			plugins: ['typescript', 'typescript-resolvers'],
			config: {
				useIndexSignature: true,
				contextType: '../context/graphql#ApiContext',
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
