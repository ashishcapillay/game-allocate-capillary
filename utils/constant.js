module.exports = {
    HTTP: {
        GET_TRANSACTION_EP: "https://apac.api.capillarytech.com/v1.1/transaction/get",
        GAME_ALLOCATE_EP: "https://apac.api.capillarytech.com/api_gateway/gamification/v1/game/allocate",
        GET_GAMIFICATION: "https://apac.api.capillarytech.com/api_gateway/gamification/v1/brand/PIDILITEDEMO/user/games/all"
    },
    TOKENS: {
        BASIC_AUTH: process.env.BASIC_AUTH ?? ""
    },
    SERVER: {
        PORT: process.env.PORT ?? 4103,
        BASE_EP: "/game-allocate"
    },
    DB: {
        HOST: 'localhost',
        USER: '',
        PASSWORD: process.env.DB_PASS ?? "",
        DB_NAME: "",
        DIALECT: "mysql",
        POOL: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
    GAME_VALIDATE_PARAMS: {
        DEFAULT_DATA: [{
            skuCode: "XYZ",
            clusterName: "123",
            pin: 560068,
            gameId: 68186,
            gameStartDate: "2024-09-16T12:30:45",
            gameEndDate: "2024-09-31T12:30:45"
        }, {
            skuCode: "WER",
            clusterName: "123",
            pin: 560068,
            gameId: 68186,
            gameStartDate: "2024-09-16T12:30:45",
            gameEndDate: "2024-09-31T12:30:45"
        }, {
            skuCode: "PQR",
            clusterName: "321",
            pin: 560068,
            gameId: 68186,
            gameStartDate: "2024-09-16T12:30:45",
            gameEndDate: "2024-09-31T12:30:45"
        }, {
            skuCode: "LKE",
            clusterName: "321",
            pin: 560068,
            gameId: 68186,
            gameStartDate: "2024-09-16T12:30:45",
            gameEndDate: "2024-09-31T12:30:45"
        }],
        TRX_DEFAULT_RESPONSE_CF: [
            {
            "name": "sku_code",
            "value": "XYZ"
            },
            {
            "name": "cluster_name",
            "value": "321"
            },
            {
            "name": "pin",
            "value": "560068"
            }
        ],
        TRX_SKUS: ["XYZ", "WER", "PQR", "LKE"],
        MOBILE: 919991000017
    },
    RETURN_MESSAGE: {
        TRX_NOT_AVAILABLE: "Tranasaction details is not valid!",
        NO_SKU_PIN_MATCHED: "No SKU, Cluster and Pin are matched!",
        NO_TRX_DETAILS: "No Transaction details found, for process allocation!",
        GAME_ALLOCATED_UPDATE_ERROR: "Error while allocating game, customer not found!",
        GAME_ALLOCATED: "Game allocation done and updated!"
    }
}