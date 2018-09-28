const {
  mysql
} = require('../mysql');

/**
 * 提交反馈
 * @param {Obejct} params 
 */
async function submitFeedback(params) {
  const {
    openId,
    name,
    content,
    phone
  } = params;
  const data = await mysql("nideshop_feedback").insert({
    'user_id': openId,
    "user_name": name,
    "msg_content": content,
    "connect": phone,
    "msg_time": new Date().getTime()
  });
  return {
    data: data ? true : false,
    msg: data ? "submit successfully" : "submit failed"
  }
}

/**
 * 获取我的反馈列表
 * @param {Obejct} params 
 */
async function getFeedbackList(params) {
  const {
    openId,
    page = 1
  } = params;
  const size = 7;
  let list = [];
  let listAll = [];
  let total = 0;
  if (openId) {
    //分页  limit：每页条数  offset：从第几条开始(索引开始值为 0) 排序 orderBy(字段,desc:倒序 | asc:正序)
    list = await mysql("nideshop_feedback").where({
      user_id: openId
    }).limit(size).offset((page - 1) * size).orderBy('msg_time', 'desc').select();
    listAll = await mysql("nideshop_feedback").select();
    total = parseInt(listAll.length / 5)
  }
  return {
    page: page,
    data: list,
    total: total
  }
}

/**
 * 获取反馈详情
 * @param {Obejct} params 
 */
async function getFeedbackDetail(params) {
  const {
    id,
    openId
  } = params;
  const detail = await mysql("nideshop_feedback").where({
    id: id,
    user_id: openId
  });
  console.log(detail);
  return {
    data: detail[0] || {}
  }
}
module.exports = {
  submitFeedback,
  getFeedbackList,
  getFeedbackDetail
}