const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const prediction = require('./routes/prediction');
const teams = require('./routes/teams');
const users = require('./routes/users');
const games = require('./routes/games');
const productionConfig = require('./config/production');
const devConfig = require('./config/development');
const app = express();

app.use(bodyParser.json())
    .use(morgan('dev'))
    .use(bodyParser.urlencoded({ extended: true }))
    .use(prediction)
    .use(teams)
    .use(users)
    .use(games)

process.env.NODE_ENV === 'development'
    ? devConfig(app)
    : productionConfig(app)

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});