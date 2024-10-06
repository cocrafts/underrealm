const { swcOptions, copyAssets } = require('../../tools/configs/bundler');

module.exports = {
	swcOptions,
	publicPath: () => process.env.PUBLIC_URL || '/',
	keepPreviousBuild: () => true,
	buildId: () => 'app',
	webpackMiddlewares: [copyAssets],
	htmlPluginOptions: { chunks: ['app'] },
};
