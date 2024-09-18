const express = require("express");
const GameAllocationRouter = express.Router();
const GameAllocationController = require("../controllers/game");

GameAllocationRouter.post("/allocate_game", async (req, res) => {
    return res.send(await new GameAllocationController().allocateGame(req));
});

module.exports = GameAllocationRouter;