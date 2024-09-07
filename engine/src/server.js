require('@swc/register');

const { addAlias } = require('module-alias');
const { resolve } = require('path');

addAlias('@metacraft/murg-engine', resolve(__dirname, './package/murg'));

require('./tool/murg-server');
