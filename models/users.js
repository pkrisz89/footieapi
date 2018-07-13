'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('USER', {
        userId: { type: DataTypes.STRING, primaryKey: true},
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        score: {type: DataTypes.INTEGER, defaultValue: 0}
    }, { freezeTableName: true });

    return User;
};