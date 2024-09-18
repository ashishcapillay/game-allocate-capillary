module.exports = {
    HTTP: {
        GET_TRANSACTION_EP: "https://apac.api.capillarytech.com/v2/transactions",
        GAME_ALLOCATE_EP: "https://apac.api.capillarytech.com/api_gateway/gamification/v1/game/allocate"
    },
    TOKENS: {
        BASIC_AUTH: process.env.BASIC_AUTH ?? ""
    },
    SERVER: {
        PORT: process.env.PORT ?? 4100,
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
    }
}