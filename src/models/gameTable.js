const { DataTypes } = require("sequelize");
const { sequelizeConfig } = require("../../config/dbConfig");

const GameSchema = sequelizeConfig.define('Games', {
    gameId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gameStartDate: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gameEndDate: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = GameSchema;