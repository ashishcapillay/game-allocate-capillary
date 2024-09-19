const axios = require("axios");
const { HTTP, TOKENS } = require("./constant");

module.exports = {
    getTrxDetails: async () => {
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
            console.log("API-getTrxDetails-Error", error);
            throw error;
        }
    },

    doGameAllocation: async (gameId, mobile) => {
        try {
            const allocGameApi = await axios.post(HTTP.GAME_ALLOCATE_EP, {
                "brandId": 150,
                "gameId": gameId ?? 68186,
                "mobile": mobile ?? 919991000015
            }, {
                headers: {
                    Authorization: TOKENS.BASIC_AUTH,
                    Accept: "*/*",
                    "Content-Type": "application/json"
                }
            });
            return allocGameApi ? allocGameApi.data : {};
        } catch (error) {
            console.log("doGameAllocation-Error", error);
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
            console.log("getGamificationDetails-Error", error);
            throw error;
        }
    }
};