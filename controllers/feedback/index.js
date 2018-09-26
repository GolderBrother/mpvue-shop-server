const {
  mysql
} = require('../../mysql');

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

  const data = await mysql("nideshop_feedback").insert({
    'user_id': openId,
    "user_name": name,
    "msg_content": content,
    "connect": phone,
    "msg_time": new Date().getTime()
  })
  console.log(data)
  if (data) {
    ctx.body = {
      data: true
    }
  } else {
    ctx.body = {
      data: false
    }
  }

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
  const size = 7;
  let list = [];
  let listAll = [];
  let total = 0;
  if (openId) {
    //分页  limit：每页条数  offset：从第几条开始(索引开始值为 0)
    list = await mysql("nideshop_feedback").where({
      user_id: openId
    }).limit(size).offset((page - 1) * size).select();
    listAll = await mysql("nideshop_feedback").select();
    total = parseInt(listAll.length / 5)
  }
  ctx.body = {
    page: page,
    data: list,
    total: total
  }
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
  const detail = await mysql("nideshop_feedback").where({
    id: id,
    user_id: openId
  });
  console.log(detail);
  ctx.body = {
    data: detail[0]
  }
}

module.exports = {
  submitAction,
  getListAction,
  getDetailAction
}