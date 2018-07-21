const express = require('express');
const models = require('../models');
const router = express.Router();

router.get('/allUser', (req, res) => {
    models.USER.findAll().then(users => {
        res.json({ users });
    });
});

router.post('/user', (req, res) => {
    const { userId, firstName, lastName } = req.body;
    models.USER
        .findOrCreate({ where: { userId, firstName, lastName } })
        .spread((user, created) => {
            res.json({ created, user })
        });
});

router.put('/user/:userId/calculate-score', (req, res) => {
    const { userId } = req.params;
    models.PREDICTION
        .findAll({ where: { userId }, include: [{ model: models.GAME, as: 'game' }, { model: models.USER, as: 'user' }] })
        .then(predictions => {
            const score = predictions.reduce((acc, curr) => {
                if (curr.prediction === curr.game.result) {
                    return acc += 1;
                }
                return acc;
            }, 0)

            models.USER.update({ score }, { where: { userId } })
                .then(() => res.json({ updated: true }))
        })
});

module.exports = router;