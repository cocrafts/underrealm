const { resolve } = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const isProd = process.env.ENV === 'production';

const copyAssets = (configs) => {
	configs.plugins.push(
		new CopyPlugin({
			patterns: [
				{
					from: resolve(process.cwd(), 'assets/'),
					to: './',
					filter: (uri) => {
						const isTemplate = uri.endsWith('.ejs') || uri.endsWith('.sass');
						return !isTemplate;
					},
				},
			],
		}),
	);

	return configs;
};

const globalVariableNames = [
	'FIREBASE_API_KEY',
	'FIREBASE_AUTH_DOMAIN',
	'FIREBASE_PROJECT_ID',
	'FIREBASE_STORAGE_BUCKET',
	'FIREBASE_MESSAGING_SENDER_ID',
	'FIREBASE_APP_ID',
	'FIREBASE_MEASUREMENT_ID',
	'SOCKET_URI',
	'GRAPHQL_API_ENDPOINT',
	'SOLANA_CLUSTER',
	'AUTH_REDIRECT_ORIGIN',
];

const injectEnvironments = (configs, internal) => {
	const { webpack } = internal.modules;
	const { DefinePlugin } = webpack;
	const { env } = internal.configs;
	const isProduction = internal.configs.isProduction;

	const globalVariables = globalVariableNames.reduce(
		(acc, cur) => ({ ...acc, [cur]: JSON.stringify(process.env[cur]) }),
		{},
	);

	configs.plugins[0] = new DefinePlugin({
		process: { env: {} },
		__DEV__: !isProduction,
		ENV: JSON.stringify(env),
		...globalVariables,
	});

	return configs;
};

const splitBundle = (configs) => {
	configs.entry = {
		app: {
			...configs.entry.app,
			dependOn: ['rn-libs'],
		},
		'rn-libs': {
			import: [
				'react-native',
				'react-native-reanimated',
				'react-native-gesture-handler',
				'@react-native-async-storage/async-storage',
				'@react-navigation/native',
				'@react-navigation/stack',
			],
		},
	};

	return configs;
};

const swcOptions = () => ({
	jsc: {
		parser: {
			syntax: 'typescript',
			tsx: true,
			dynamicImport: true,
		},
		minify: isProd
			? {
					compress: true,
					mangle: true,
					format: {
						comments: false,
					},
				}
			: {},
	},
	// TODO: temporarily resolve "Error: `env` and `jsc.target` cannot be used together"
	// env: {
	// 	targets: {
	// 		chrome: '67',
	// 		edge: '79',
	// 		firefox: '68',
	// 		opera: '54',
	// 		safari: '14',
	// 	},
	// },
});

const extraPolyfills = (configs) => {
	configs.resolve.fallback['vm'] = require.resolve('vm-browserify');

	return configs;
};

const babelLoaderAsFallback = (configs) => {
	configs.module.rules.push({
		test: /\.js$/,
		include: /node_modules\/react-native-inappbrowser-reborn/,
		use: {
			loader: 'babel-loader',
			options: {
				presets: ['@babel/preset-env'],
			},
		},
	});

	return configs;
};

module.exports = {
	copyAssets,
	injectEnvironments,
	splitBundle,
	swcOptions,
	extraPolyfills,
	babelLoaderAsFallback,
};
