const { Op, cast } = require('sequelize');
const { sequelizeConfig } = require("../config/dbConfig");
const GameValidationSchema = require("../src/models/gameTable");
const GameAllocationHistorySchema = require("../src/models/gameAllocateHistory");

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
            console.log("DBQuery-storeGameValidateInTable-Error", error);
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
            console.log("DBQuery-fetchGameValidateQuery-Error", error);
            throw new Error(error);
        }
    }

    updateGameTotalAllocation = async (gameid, mobile, playlimit) => {
        try {
            await sequelizeConfig.sync({ force: false, alter: true });
            await GameAllocationHistorySchema.findOrCreate({
                where: {
                    gameId: gameid,
                    mobile: mobile
                },
                defaults: {
                    gameId: gameid, 
                    mobile: mobile, 
                    totalAllocation: playlimit
                }
            });
        } catch (error) {
            console.log("DBQuery-updateGameTotalAllocation-Error", error);
            throw new Error(error);
        }
    }
}

module.exports = DBQuery