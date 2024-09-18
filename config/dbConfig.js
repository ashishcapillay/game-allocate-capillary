const Sequelize = require("sequelize");
const { DB } = require("../utils/constant");

const sequelizeConfig = new Sequelize(
    DB.DB_NAME, 
    DB.USER, 
    DB.PASSWORD, {
        host: DB.HOST,
        dialect: 'mysql'
    }
);
async function mySqlConnection(){
    try {
        await sequelizeConfig.authenticate();
        console.log("Database connected!");
    } catch (error) {
        console.log("Error while making MY-SQL connection: ", error);
        throw error;
    }
}

module.exports = {
    mySqlConnection, sequelizeConfig
}