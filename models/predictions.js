'use strict';
module.exports = (sequelize, DataTypes) => {
    const Prediction = sequelize.define('PREDICTION', {
        predictionId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        prediction: DataTypes.ENUM('home', 'draw', 'visitor')
    }, { freezeTableName: true });

    Prediction.associate = function ({ PREDICTION, USER, GAME }) {
        PREDICTION.belongsTo(USER, { foreignKey: 'userId', as: 'user'});
        PREDICTION.belongsTo(GAME, { foreignKey: 'gameId', as: 'game'});
    };

    return Prediction;
};