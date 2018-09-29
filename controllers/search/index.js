const searchService = require("../../service/search");

async function indexAction(ctx) {
  const { openId } = ctx.query;
  const res = await searchService.getIndexKeywords(openId);
  ctx.body = res;
}
//搜索的时候匹配搜索相关的 模糊搜索 like '%keyword%'
async function helperAction(ctx) {
  const { keyword, order} = ctx.query;
  const res = await searchService.getHelperKeywords(keyword, order);
  ctx.body = res;
}
// async function () {

// }
// await this.model('search_history').add({
//   keyword: keyword,
//   user_id: think.userId,
//   add_time: parseInt(new Date().getTime() / 1000)
// });

//添加搜索历史
async function addHistoryAction(ctx) {
  const {
    openId,
    keyword
  } = ctx.request.body
  const res = await searchService.addSearchHistory(openId,keyword);
  ctx.body = res;
}

//删除搜索历史
async function clearhistoryAction(ctx) {
  const { openId } = ctx.request.body;
  const res = await searchService.delSearchHistory(openId); 
  ctx.body = res;
}

module.exports = {
  indexAction,
  helperAction,
  addHistoryAction,
  clearhistoryAction
}