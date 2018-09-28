const feedbackService = require("../../service/feedback");
/**
 * 提交反馈
 * @param {context} ctx 
 */
async function submitAction(ctx) {
  const {
    openId,
    name,
    content,
    phone
  } = ctx.request.body;
  const res = await feedbackService.submitFeedback({
    openId,
    name,
    content,
    phone
  });
  ctx.body = res;
}

/**
 * 获取我的反馈列表
 * @param {context} ctx
 */
async function getListAction(ctx) {
  const {
    openId,
    page = 1
  } = ctx.query;
  const res = await feedbackService.getFeedbackList({openId,page})
  ctx.body = res;
}

/**
 * 获取反馈详情
 * @param {context} ctx 
 */
async function getDetailAction(ctx) {
  const {
    id,
    openId
  } = ctx.query;
  const res = await feedbackService.getFeedbackDetail({id,openId})
  ctx.body = res;
}

module.exports = {
  submitAction,
  getListAction,
  getDetailAction
}