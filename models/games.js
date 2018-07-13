'use strict';
module.exports = (sequelize, DataTypes) => {
    const Game = sequelize.define('GAME', {
        gameId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        result: DataTypes.ENUM('home','draw','visitor'),
        startDateTime: DataTypes.DATE
    }, { freezeTableName: true });

    Game.associate = function ({GAME, TEAM}) {
        GAME.belongsTo(TEAM, {
            foreignKey: 'homeTeamId',
            as: 'homeTeam'
        });
        GAME.belongsTo(TEAM, {
            foreignKey: 'awayTeamId',
            as:'awayTeam'
        });
    };

    return Game;
};