const { DataTypes } = require("sequelize");
const { sequelizeConfig } = require("../../config/dbConfig");

const GameAllocateHistorySchema = sequelizeConfig.define('GameAllocateHistory', {
    gameId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    mobile: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    totalAllocation: {
        type: DataTypes.INTEGER, // Map userPlayLimit key here from gamification API
    }
});

module.exports = GameAllocateHistorySchema;