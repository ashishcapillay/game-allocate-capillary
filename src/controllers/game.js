const _ = require("lodash");
const { GAME_VALIDATE_PARAMS } = require("../../utils/constant");
const DBQuery = require("../../utils/dbQueries");
const { getTrxDetails, doGameAllocation, getGamificationDetails } = require("../../utils/httpService");
const { 
  gameValidation, 
  customFieldModifiy, 
  lineItemsSKUMatch,
  lineItemsSKUFilter
} = require("../../utils/validators");
class Game {
    constructor(){}

    storeGameTotalAllocation = async (gameId, mobile) => {
      try {
        setTimeout(async () => {
          const getAllocationDetails = await getGamificationDetails(gameId, mobile);
          if(getAllocationDetails?.gamesList && getAllocationDetails.gamesList?.length){
            // Store the values in DB:
            const getMatchedVal = getAllocationDetails.gamesList.filter((g) => {
              return gameId == g?.id;
            });
            if(!_.isEmpty(getMatchedVal)){
              await new DBQuery().updateGameTotalAllocation(gameId, mobile, getMatchedVal[0].userPlayLimit);
            }
          }
        }, 1500);
      } catch (error) {
        console.log("Controller-storeGameTotalAllocation-catch-error", error);
        throw error;
      }
    }

    procesGameValidations = async (req) => {
      try {
        // 1: Get details of transaction :
        const callTrxDetails = await getTrxDetails();
        if(callTrxDetails && !_.isEmpty(callTrxDetails)){
          // 2: Match and validate the values like clusterName, pin and skuCode from DB to transaction details API's response :
          // 2.1 Check and get there's custom filed in trx details API or not:
          const checkAndGetCFVal = customFieldModifiy(callTrxDetails);
          const queryDBRes = await new DBQuery().fetchGameValidateQuery(checkAndGetCFVal);
          if(!_.isEmpty(queryDBRes)){
            // 3: Get the item_code from the trx details API, by matching sku code
            const lineItemsSKUForQty = lineItemsSKUFilter(callTrxDetails);
            // 4: It will return all the SKU's item code matched value, now based on the qty, call the game allocate API
            const checkIfSKUMatched = lineItemsSKUMatch(lineItemsSKUForQty, JSON.parse(queryDBRes));
            if(checkIfSKUMatched){
              // 5: Handle the game allocation API by calling it times equals to QTY value:
              for(let i=0; i<checkIfSKUMatched; i++){
                await doGameAllocation(queryDBRes?.gameId, GAME_VALIDATE_PARAMS.MOBILE);
              }
              await this.storeGameTotalAllocation(JSON.parse(queryDBRes).gameId, GAME_VALIDATE_PARAMS.MOBILE);
            }
          }
        } 
        return {
          status: 200,
          message: "Game allocation done and updated!"
        }
      } catch (error) {
        console.log("Controller-procesGameValidations-catch-error", error);
        throw error;
      }
    }

    // It's only to store the details in gamw validation table (call only once) :
    storeGameValidateDetails = async () => {
      try {
        const dbRes = await new DBQuery().storeGameValidateInTable(GAME_VALIDATE_PARAMS.DEFAULT_DATA);
        return dbRes;
      } catch (error) {
        console.log("Controller-storeGameValidateDetails-catch-error", error);
        throw error;
      }
    }
}
module.exports = Game;