require('@swc/register');

const { relative, resolve } = require('path');
const { watch } = require('chokidar');
const invalidate = require('invalidate-module');
const { addAlias } = require('module-alias');
const React = require('react');
const { render } = require('ink');

addAlias('@metacraft/murg-engine', resolve(__dirname, './package/murg'));

const { measureExecutionTime } = require('./tool/murg-client/util');
let App = require('./tool/murg-client').MURG;
let lastRenderTime = 0;

const makeElement = (el, config, history) => {
	const props = {
		config,
		history,
		renderTime: lastRenderTime,
	};

	return React.createElement(el, props);
};

const { config, history } = require('./tool/murg-client/duels').default;

measureExecutionTime('initial-render', 'time to render App');
const { rerender } = render(makeElement(App, config, history));
lastRenderTime = measureExecutionTime('initial-render');

watch(process.cwd(), {
	ignoreInitial: true,
	ignored: ['**/node_modules/**/*', '**/.git/**/*', '**/.idea/**/*'],
}).on('all', (event, filename) => {
	const relativeUri = relative(process.cwd(), filename);
	let element = makeElement(App, config, history);

	invalidate(resolve(filename));
	require(resolve(filename));

	measureExecutionTime('render', 'time to render App');
	if (relativeUri.startsWith('tool/murg-client/duels')) {
		const { config, history } = require('./tool/murg-client/duels').default;
		element = makeElement(App, config, history);
	}

	if (relativeUri.endsWith('.tsx')) {
		App = require('./tool/murg-client').MURG;
		element = makeElement(App, config, history);
	}

	rerender(element);
	lastRenderTime = measureExecutionTime('render');
});
