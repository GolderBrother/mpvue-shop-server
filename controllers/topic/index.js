const topicService = require("../../service/topic");
//专题列表
async function listAction(ctx) {
  const {
    page = 1
  } = ctx.query;
  const res = await topicService.getList(page);
  ctx.body = res;
}

//列表详情,下方还有四个专题推荐
async function detailAction(ctx) {
  const {
    id
  } = ctx.query;
  const res = await topicService.getDetail(id);
  ctx.body = res;
}

module.exports = {
  listAction,
  detailAction
}