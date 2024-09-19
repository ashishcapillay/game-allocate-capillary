const { DataTypes } = require("sequelize");
const { sequelizeConfig } = require("../../config/dbConfig");

const GameValidationSchema = sequelizeConfig.define('GameValidation', {
    skuCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    clusterName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pin: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    gameId: {
        type: DataTypes.INTEGER,
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

module.exports = GameValidationSchema;