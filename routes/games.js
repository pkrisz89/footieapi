const express = require('express');
const models = require('../models');
const router = express.Router();

const { sequelize } = models;

router.post('/game', (req, res) => {
    const { homeTeamId, awayTeamId, startDateTime } = req.body;
    models.GAME
        .findOrCreate({ where: { homeTeamId, awayTeamId, startDateTime } })
        .spread((game, created) => {
            res.json({ created, game });
        })
});

router.put('/game/:gameId/result', (req, res) => {
    const { gameId } = req.params;
    const { result } = req.body;

    return models.GAME.update({ result },
        {
            where: { gameId }
        }).then(updated => res.json({ updated }))
});

router.get('/game/:gameId', (req, res) => {
    const { gameId } = req.params;

    return models.GAME.find({ where: { gameId } }).then(response => res.json({ response }))
});

router.get('/games/:date', (req, res) => {
    const { date } = req.params;

    return models.GAME
        .findAll({
            where: sequelize.where(sequelize.fn('date', sequelize.col('startDateTime')), '=', date),
            include: ['homeTeam', 'awayTeam']
        })
        .then(result => res.json({ result }))
});

router.get('/games', (req, res) => {
    models.GAME.findAll().then((game) => {
        res.json({ game })
    })
});

module.exports = router;