module.exports = {
    handleProcessGAReq: (req, res, next) => {
        try {
            if(!req.body?.trxId || !req.body?.mobile){
                return res.send({
                    status: 422,
                    error: "Either trxId or mobile is missing from parameters! Please check."
                });
            }
            next();
        } catch (error) {
            return res.send({
                status: 501,
                error: "Unexptected Error occured!"
            });
        }
    },

    handleTrxValidation: (trxdetails, mobile, trxid) => {
        if(trxdetails && trxdetails.response?.transactions?.transaction?.length){
            const trxCustomer = trxdetails.response?.transactions?.transaction[0].customer;
            return trxCustomer.mobile == mobile ? true : false;
        }
        return false;
    }
}