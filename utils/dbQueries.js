const { sequelizeConfig } = require("../config/dbConfig");
const GameSchema = require("../src/models/gameTable");

class DBQuery {
    constructor(){}

    updatetGameTable = async () => {
        try {
            await sequelizeConfig.sync({ force: true });
            console.log("Database and game-allocate table created locally..");
            const updateGA = await GameSchema.findAll();
            return updateGA?.length ? updateGA : {};
        } catch (error) {
            console.log("DBQuery-updatetGameTable-Error", error);
            throw new Error(error);
        }
    }
}

module.exports = DBQuery