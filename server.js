const express = require("express");
const { SERVER } = require("./utils/constant");
const gameAllocateApp = express();
const bodyParser = require("body-parser");
gameAllocateApp.use(bodyParser.urlencoded({ extended: false }));
gameAllocateApp.use(bodyParser.json());
const { mySqlConnection } = require("./config/dbConfig");
require("dotenv").config({path: "variable.env"})
mySqlConnection();

gameAllocateApp.use(SERVER.BASE_EP, require("./src/routes/gameAllocate"));

gameAllocateApp.listen(SERVER.PORT, (error) => {
    if(error) console.log("Error while starting server");
    console.log(`Server started on: ${SERVER.PORT}`);
});