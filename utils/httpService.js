const axios = require("axios");
const { HTTP, TOKENS } = require("./constant");

module.exports = {
    getTrxDetails: async (trxId) => {
        try {
            const callTrxDetApi = await axios.get(`${HTTP.GET_TRANSACTION_EP}/${trxId ?? 38236823}`, {
                params: {
                    type: 'REGULAR'
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

    doGameAllocation: async () => {
        try {
            const allocGameApi = await axios.post(HTTP.GAME_ALLOCATE_EP, {
                "brandId": 150,
                "gameId": 68186,
                "mobile": 919991000015
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
    }
};