const homeService = require("../../service/home");
async function homeAction(ctx){
    const homeData = await homeService.getHomeData();
    ctx.body = homeData;
}
module.exports = {
    homeAction
}