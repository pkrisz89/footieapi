const { resolve } = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const logger = require('./logger');
const webpackConfig = require('./webpack.config.dev');

const compiler = webpack(webpackConfig);
const dev = (app) => {
    app.use(
        webpackDevMiddleware(compiler, {
            logger,
            publicPath: webpackConfig.output.publicPath,
            stats: {
                colors: true
            }
        })
    );

    app.use(webpackHotMiddleware(compiler));

    // all other requests be handled by UI itself
    app.get('*', (req, res) => res.sendFile(resolve(__dirname, '..', 'build-dev', 'client', 'index.html')));
};

module.exports = dev;