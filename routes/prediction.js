const express = require('express');
const models = require('../models');
const router = express.Router();

const {sequelize} = models;


router.post('/prediction',(req,res) => {
    const { gameId, userId, prediction} = req.body;
    models.PREDICTION
        .findOrCreate({ where: { gameId, userId, prediction}})
        .spread((prediction,created) => {
            res.json({created,prediction})
        })
});

router.get('/user/:userId/predictions',(req,res) => {
    const {userId} = req.params;
    models.PREDICTION
        .findAll({ where: { userId }, include: [{model: models.GAME, as: 'game'},{model: models.USER, as:'user'}]})
        .then(prediction => {
            res.json({prediction})
        })
});

router.get('/prediction/:userId/last',(req,res) => {
    const {userId} = req.params;
    const rightNow = new Date();
    const dateString = rightNow.toISOString().slice(0, 10);

    return models.PREDICTION.findAll({
        limit: 1,
        where: sequelize.and({ userId },
            sequelize.where(sequelize.fn('date', sequelize.col('createdAt')), '<=', dateString)),
        order: [['createdAt', 'DESC']]
    })
    .then(result => {
        res.json({result})
    })
});

module.exports = router;