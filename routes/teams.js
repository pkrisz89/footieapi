const models = require('../models');
const express = require('express');
const router = express.Router();

router.get('/teams', (req, res) => {
    return models
        .TEAM
        .findAll()
        .then(function (teams) {
            res.json({teams});
        });
});

router.delete('/teams/:teamId', (req, res) => {
    const {teamId} = req.params;
    return models
        .TEAM
        .destroy({where: {
                teamId
            }})
        .then(response => res.json({response}))
});

router.post('/teams', (req, res) => {
    const {name} = req.body;
    return models
        .TEAM
        .findOrCreate({where: {
                name
            }})
        .spread((team, created) => {
            res.json({created, team});
        })
});

module.exports = router;