const models = require('../models');
const express = require('express');
const router = express.Router();

router.get('/teams', (req, res) => {
    return models.TEAM.findAll().then(function (teams) {
        res.json({
            teams
        });
    });
});

router.post('/teams', (req, res) => {
    const { name } = req.body;
    models.TEAM
        .findOrCreate({ where: { name } })
        .spread((team, created) => {
            res.json({ created, team });
        })
});

module.exports = router;