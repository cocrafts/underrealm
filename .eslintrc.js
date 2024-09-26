module.exports = {
	root: true,
	extends: ['@metacraft/eslint-config'],
	plugins: ['import'],
	ignorePatterns: [
		'dist',
		'node_modules',
		'launcher/utils/graphql/sdk.ts',
		'launcher/components/DrawerNavigation',
		'tool/animationClipExample.ts',
		'game/assets/scripts/util/graphql.ts',
		'api/utils/types/graphql.ts',
	],
	env: {
		node: true,
	},
	globals: {
		module: true,
		require: true,
		document: true,
		ethereum: true,
	},
	rules: {
		'@typescript-eslint/ban-types': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/no-require-imports': 'off',
		'@typescript-eslint/no-duplicate-enum-values': 'off',
		'@typescript-eslint/no-empty-interface': 'off',
		'@typescript-eslint/no-empty-object-type': 'off',
		'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
	},
};
