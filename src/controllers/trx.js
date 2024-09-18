const { getTrxDetails } = require("../../utils/httpService");

class Trx {
    constructor(){}

    getTrx = async (req) => {
        try {
          const trxDetailsHttp = await getTrxDetails(req.params?.trx_id);
          console.log("->trxDetailsHttp", trxDetailsHttp);
          
          return {
            status: 200,
            message: "Called Get Trx"
          }
        } catch (error) {
          console.log("Controller-getTrx-catch-error", error)  
        }
    }
}
module.exports = Trx;
