const brandService = require("../../service/brand");

/** 
 * 获取品牌列表
 * @param {Object} ctx
 */
async function listAction(ctx) {
  const { page = 1 } = ctx.query;
  const brandRes = await brandService.getList(page);
  ctx.body = brandRes;
}

/** 
 * 获取品牌详情
 * @param {Object} ctx
 */
async function detailAction(ctx) {
  const { id } = ctx.query;
  const detailRes = await brandService.getDetail(id);
  ctx.body = detailRes;
}

module.exports = {
  listAction,
  detailAction
}