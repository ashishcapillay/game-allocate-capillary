const express = require("express");
const GameAllocationRouter = express.Router();
const GameAllocationController = require("../controllers/game");
const { handleProcessGAReq } = require("../../utils/middleware");

// @@ Main Endpoint : Process game allocation, validation and updation:
GameAllocationRouter.post("/process_game_allocation", handleProcessGAReq, async (req, res) => {
    return res.send(await new GameAllocationController().procesGameValidations(req));
});

// Don't call this routes twice, once value got stored in DB
GameAllocationRouter.post("/store_game_validate_details", async (req, res) => {
    return res.send(await new GameAllocationController().storeGameValidateDetails(req));
});

module.exports = GameAllocationRouter;