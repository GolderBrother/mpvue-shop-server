const orderService = require("../../service/order");
async function submitAction(ctx) {
    const {
        openId,
        goodsId,
        goodsNums,
        goodsPrice,
        submitType
    } = ctx.request.body;
    const res = await orderService.submitOrder(openId,goodsId,goodsNums,goodsPrice,submitType);
    ctx.body = res;
}
async function detailAction(ctx) {
    const { openId, addressId = "" } = ctx.query;
    const detail = await orderService.getDetail(openId, addressId);
    ctx.body = detail;
}
async function listAction(ctx) {

}
module.exports = {
    submitAction,
    detailAction,
    // listAction
}