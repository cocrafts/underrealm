const { web3Polyfills } = require('@metacraft/cli-web3-polyfills');

const {
	swcOptions,
	copyAssets,
	injectEnvironments,
	extraPolyfills,
	babelLoaderAsFallback,
} = require('../tools/configs/bundler');

module.exports = {
	publicPath: () => process.env.PUBLIC_URL || '/',
	keepPreviousBuild: () => true,
	swcOptions,
	buildId: () => 'app',
	webpackMiddlewares: [
		web3Polyfills,
		extraPolyfills,
		injectEnvironments,
		copyAssets,
		babelLoaderAsFallback,
	],
	htmlPluginOptions: {
		chunks: ['app'],
	},
	moduleAlias: {
		global: {
			'react-native': 'react-native-web',
			'react-native-inappbrowser-reborn': 'vendor/inAppBrowser',
		},
	},
};
