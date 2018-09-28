const cartService = require("../../service/cart");

/** 
 * 加入购物车
 * @param {Object} ctx
 */
async function addCart(ctx) {
  const {
    number,
    goodsId,
    openId
  } = ctx.request.body
  const res = await cartService.addCart({number,goodsId,openId});
  ctx.body = res;
}

/** 
 * 获取购物车列表
 * @param {Object} ctx
 */
async function cartList(ctx) {
  const {
    openId
  } = ctx.query;
  const res = await cartService.getList(openId);
  ctx.body = res;
}


async function deleteAction(ctx) {
  const {
    id
  } = ctx.query;
  const res = await cartService.deleteCart(id);
  ctx.body = res;
}

module.exports = {
  addCart,
  cartList,
  deleteAction
}