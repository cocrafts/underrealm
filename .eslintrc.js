module.exports = {
	root: true,
	extends: ['@metacraft/eslint-config'],
	ignorePatterns: [
		'node_modules',
		'launcher/utils/types/graphql.ts',
		'launcher/components/DrawerNavigation',
		'tool/animationClipExample.ts',
		'game/assets/scripts/util/graphql.ts',
		'game',
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
		'@typescript-eslint/no-require-imports': 'off',
		'@typescript-eslint/no-duplicate-enum-values': 'off',
	},
};
