const DBQuery = require("../../utils/dbQueries");
const { doGameAllocation } = require("../../utils/httpService");
class Game {
    constructor(){}

    allocateGame = async () => {
        try {
          const doGameAllocHttp = await doGameAllocation();
          console.log("->doGameAllocHttp", doGameAllocHttp);
          
          // const dbres = await new DBQuery().updatetGameTable();
          return {
            status: 200,
            message: "Called Allocate Game",
            data: {}
          }
        } catch (error) {
          console.log("Controller-allocateGame-catch-error", error)  
        }
    }
}
module.exports = Game;