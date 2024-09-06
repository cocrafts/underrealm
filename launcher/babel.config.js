module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
		[
			'module-resolver',
			{
				root: ['./src'],
				alias: {
					components: './launcher/components',
					stacks: './launcher/stacks',
					screens: './launcher/screens',
					utils: './launcher/utils',
					path: './launcher/vendor/path',
					zlib: './launcher/vendor/zlib',
					crypto: 'react-native-quick-crypto',
					stream: 'stream-browserify',
				},
			},
		],
		['react-native-reanimated/plugin'],
		['@babel/plugin-proposal-export-namespace-from'],
	],
};

