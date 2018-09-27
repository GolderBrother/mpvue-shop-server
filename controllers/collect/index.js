const {
  mysql
} = require('../../mysql');

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
  //判断是否收藏过
  const iscollect = await mysql("nideshop_collect").where({
    "user_id": openId,
    "value_id": goodsId
  }).select()
  if (iscollect.length == 0) {
    await mysql('nideshop_collect').insert({
      "user_id": openId,
      "value_id": goodsId
    })
  } else {
    await mysql("nideshop_collect").where({
      "user_id": openId,
      "value_id": goodsId
    }).del()
  }
  ctx.body = {
    data: "success"
  }
}
async function listAction(ctx) {
  const { openId } = ctx.query;
  const data = await mysql("nideshop_collect").where({
    "user_id": openId,
  }).select()
  let goodsIds = [];
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    goodsIds.push(element.value_id)
  }
  const listData = await mysql("nideshop_goods").whereIn('id', goodsIds).column('id', 'name', 'list_pic_url', 'retail_price', 'goods_brief').select();
  ctx.body = {
    collectGoodsList: listData
  }
}

async function deleteCollect(ctx) {
  const { openId, goodsId } = ctx.query;
  const data = await mysql("nideshop_collect").where({
    "user_id":openId,
    "value_id":goodsId
  }).del();
  console.log(data)
  ctx.body = {
    'data': data ? "删除成功" : "删除失败"
  }

}
module.exports = {
  addCollect,
  deleteCollect,
  listAction
}