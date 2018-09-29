const orderService = require("../../service/order");
async function submitAction(ctx) {
    const {
        openId,
        goodsId,
        goodsNumber,
        allPrice
    } = ctx.request.body;
    const res = await orderService.submitOrder(openId,goodsId,goodsNumber,allPrice);
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