// config-overrides.js
const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    util: path.resolve(__dirname, 'node_modules/util/'),
  })
);
