const express = require("express");
const TrxRouter = express.Router();
const TrxController = require("../controllers/trx");

TrxRouter.get("/get_trx/:trx_id", async (req, res) => {
    return res.send(await new TrxController().getTrx(req));
});

module.exports = TrxRouter;