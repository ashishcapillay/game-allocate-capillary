const { DataTypes } = require("sequelize");
const { sequelizeConfig } = require("../../config/dbConfig");

const FailedGameAllocateSchema = sequelizeConfig.define('FailedGameAllocate', {
    gameId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    mobile: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    trxId: {
        type: DataTypes.INTEGER
    }
});

module.exports = FailedGameAllocateSchema;