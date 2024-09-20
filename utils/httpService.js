const axios = require("axios");
const { HTTP, TOKENS } = require("./constant");
const loggerPino = require("../logger");
const DBQuery = require("../utils/dbQueries");

module.exports = {
    getTrxDetails: async (trxId) => {
        try {
            const callTrxDetApi = await axios.get(HTTP.GET_TRANSACTION_EP, {
                params: {
                    format: 'json',
                    number: "abc123"
                },
                headers: {
                    Authorization: TOKENS.BASIC_AUTH,
                    Accept: "*/*",
                    "Content-Type": "application/json"
                }
            });
            return callTrxDetApi ? callTrxDetApi.data : {};
        } catch (error) {
            loggerPino.error(`API-getTrxDetails-Error : ${error}`);
            throw error;
        }
    },

    doGameAllocation: async (gameid, mobile, trxid) => {
        try {
            const allocGameApi = await axios.post(HTTP.GAME_ALLOCATE_EP, {
                "brandId": 150,
                "gameId": gameid ?? 68186,
                "mobile": mobile ?? 919991000015
            }, {
                headers: {
                    Authorization: TOKENS.BASIC_AUTH,
                    Accept: "*/*",
                    "Content-Type": "application/json"
                }
            });
            if(allocGameApi && allocGameApi.data) return allocGameApi.data;
            await new DBQuery().storeFailedGameAllocationFromAPI({
                trxId: trxid,
                gameId: gameid,
                mobile: mobile
            });
        } catch (error) {
            loggerPino.error(`API-doGameAllocation-Error : ${error}`);
            throw error;
        }
    },

    getGamificationDetails: async (gameId, mobile) => {
        try {
            const callGamificationApi = await axios.get(HTTP.GET_GAMIFICATION, {
                params: { mobile },
                headers: {
                    Authorization: TOKENS.BASIC_AUTH,
                    Accept: "*/*",
                    "Content-Type": "application/json"
                }
            });
            return callGamificationApi?.data ?? {}
        } catch (error) {
            loggerPino.error(`API-getGamificationDetails-Error : ${error}`);
            throw error;
        }
    }
};