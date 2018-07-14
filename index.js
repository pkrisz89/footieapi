const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const prediction = require('./routes/prediction');
const teams = require('./routes/teams');
const users = require('./routes/users');
const games = require('./routes/games');
const dashboard = require('./routes/dashboard');
const ReactEngine = require('express-react-engine');
const app = express();

app.use(bodyParser.json())
    .use(morgan('dev'))
    .use(bodyParser.urlencoded({ extended: true }))
    .use(prediction)
    .use(teams)
    .use(users)
    .use(games)
    .use(dashboard);

app.set('views', __dirname + '/components');
app.engine('jsx', ReactEngine());

process.env.PORT = process.env.PORT || 8081;

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});