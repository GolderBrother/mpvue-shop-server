const collectService = require("../../service/collect");

/**
 * 添加收藏
 * @param {*} ctx
 */
async function addCollect(ctx) {
  // 获取 post 方式传过来的数据
  const {
    openId,
    goodsId
  } = ctx.request.body
  const res = await collectService.addCollect({openId,goodsId});
  ctx.body = res;
}

/**
 * 获取收藏列表
 * @param {*} ctx
 */
async function listAction(ctx) {
  const { openId } = ctx.query;
  const res = await collectService.getCollectList(openId)
  ctx.body = res;
}

/**
 * 删除收藏
 * @param {Obejct} ctx
 */
async function deleteCollect(ctx) {
  const { openId, goodsId } = ctx.query;
  const res = await collectService.delCollect({ openId, goodsId });
  ctx.body = res;
}
module.exports = {
  addCollect,
  deleteCollect,
  listAction
}