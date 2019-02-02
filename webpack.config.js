const webpackMerge = require('webpack-merge');
const common = require('./webpack/webpack.common');

const envs = {
  development: 'dev',
  production: 'prod',
  MapboxAccessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA',
};

const env = envs[process.env.NODE_ENV || 'development'];
const envConfig = env === 'dev' ? require('./webpack/webpack.dev') : require('./webpack/webpack.prod');

module.exports = webpackMerge(common, envConfig);
