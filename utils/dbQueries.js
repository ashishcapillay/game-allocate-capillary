const { Op } = require('sequelize');
const { sequelizeConfig } = require("../config/dbConfig");
const GameValidationSchema = require("../src/models/gameTable");
const GameAllocationHistorySchema = require("../src/models/gameAllocateHistory");
const FailedGameAllocateSchema = require("../src/models/failedGameAllocation");
const loggerPino = require("../logger");

class DBQuery {
    constructor(){}

    // Call only once, while running the project locally:
    storeGameValidateInTable = async (params) => {
        try {
            await sequelizeConfig.sync({ force: false });
            console.log("Database and gameValidation table created locally..");
            const storeGV = await GameValidationSchema.bulkCreate(params);
            return storeGV?.length ? storeGV : {};
        } catch (error) {
            loggerPino.error(`DBQuery-storeGameValidateInTable-Error : ${error}`);
            throw new Error(error);
        }
    }

    fetchGameValidateQuery = async (qry) => {
        try {
            const findQry = {
                where: {
                    skuCode: qry.skuCode,
                    [Op.or]: [
                        {
                            clusterName: qry.clusterName
                        },
                        {
                            clusterName: {
                                [Op.cast]: 'UNSIGNED INTEGER',
                                [Op.eq]: qry.clusterName
                            }
                        }
                    ],
                    [Op.or]: [
                        {
                            pin: qry.pin
                        },
                        {
                            pin: {
                                [Op.cast]: 'UNSIGNED INTEGER',
                                [Op.eq]: qry.pin
                            }
                        }
                    ]
                }
            };
            const fetchGV = await GameValidationSchema.findOne(findQry, {subQuery: false});
            return fetchGV ? JSON.stringify(fetchGV, null, 2) : {}; 
        } catch (error) {
            loggerPino.error(`DBQuery-fetchGameValidateQuery-Error : ${error}`);
            throw new Error(error);
        }
    }

    updateGameTotalAllocation = async (gameid, mobile, playlimit) => {
        try {
            await sequelizeConfig.sync({ force: false, alter: true });
            // change it to find or create and update
            const whereQry = {
                gameId: gameid,
                mobile: mobile
            }
            const valuesToAddUpd = {
                gameId: gameid, 
                mobile: mobile, 
                totalAllocation: playlimit
            }
            await GameAllocationHistorySchema.findOrCreate({
                where: whereQry,
                defaults: valuesToAddUpd
            });
            await GameAllocationHistorySchema.update(valuesToAddUpd, {where: whereQry})
        } catch (error) {
            loggerPino.error(`DBQuery-updateGameTotalAllocation-Error : ${error}`);
            throw new Error(error);
        }
    }

    storeFailedGameAllocationFromAPI = async (params) => {
        try {
            await sequelizeConfig.sync({ force: false });
            const storeFGA = await FailedGameAllocateSchema.create(params);
            return storeFGA?.length ? storeFGA : {};
        } catch (error) {
            loggerPino.error(`DBQuery-storeFailedGameAllocationFromAPI-Error : ${error}`);
            throw new Error(error);
        }
    }
}

module.exports = DBQuery