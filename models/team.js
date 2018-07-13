'use strict';
module.exports = (sequelize, DataTypes) => {
    const Team = sequelize.define('TEAM', {
        teamId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: DataTypes.STRING
    }, { freezeTableName: true});

    return Team;
};