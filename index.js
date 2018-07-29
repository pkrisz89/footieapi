const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const prediction = require('./routes/prediction');
const teams = require('./routes/teams');
const users = require('./routes/users');
const games = require('./routes/games');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js');
const compiler = webpack(config);

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(webpackDevMiddleware(compiler, {publicPath: config.output.publicPath}));
}

app
    .use(bodyParser.json())
    .use(morgan('dev'))
    .use(bodyParser.urlencoded({extended: true}))
    .use(prediction)
    .use(teams)
    .use(users)
    .use(games)

process.env.PORT = process.env.PORT || 8081;

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});