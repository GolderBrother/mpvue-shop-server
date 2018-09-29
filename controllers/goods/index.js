const goodsService = require("../../service/goods");
/**
 * 商品详情页数据
 * 
 */
async function detailAction(ctx) {
  //ctx.query 获取get请求的参数对象的形式
  const {
    id: goodsId,
    openId
  } = ctx.query;
  const res = await goodsService.getDetail(goodsId, openId);
  ctx.body = res
}


async function goodsList(ctx) {
  const {
    categoryId,
    isNew,
    isHot,
    order
  } = ctx.query;
  // const page = this.get('page');
  const res = await goodsService.getList(categoryId, isNew, isHot, order);
  ctx.body = res;
}

module.exports = {
  detailAction,
  goodsList
}