require('@swc/register');

const { relative, resolve } = require('path');
const { watch } = require('chokidar');
const invalidate = require('invalidate-module');
const React = require('react');
const { render } = require('ink');

const { measureExecutionTime } = require('./tools/murg-client/util');
let App = require('./tools/murg-client').MURG;
let lastRenderTime = 0;

const makeElement = (el, config, history) => {
	const props = {
		config,
		history,
		renderTime: lastRenderTime,
	};

	return React.createElement(el, props);
};

const { config, history } = require('./tools/murg-client/duels').default;

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
	if (relativeUri.startsWith('tools/murg-client/duels')) {
		const { config, history } = require('./tools/murg-client/duels').default;
		element = makeElement(App, config, history);
	}

	if (relativeUri.endsWith('.tsx')) {
		App = require('./tools/murg-client').MURG;
		element = makeElement(App, config, history);
	}

	rerender(element);
	lastRenderTime = measureExecutionTime('render');
});
