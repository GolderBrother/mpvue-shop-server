const {
  mysql
} = require('../../mysql');

async function listAction(ctx) {
  const page = ctx.query.page || 1;
  const size = 5;
  //分页  limit：每页条数  offset：从第几条开始(索引开始值为 0)
  const data = await mysql('nideshop_brand').column('id', 'name', 'floor_price', 'app_list_pic_url').limit(size).offset((page - 1) * size).select();
  const data1 = await mysql('nideshop_brand').column('id', 'name', 'floor_price', 'app_list_pic_url').select();
  const total = parseInt(data1.length / size);
  ctx.body = {
    "total": total,
    data
  }
}

async function detailAction(ctx) {
  const id = ctx.query.id;
  let data = [{}];
  let goodsList = [];
  if (id) {
    data = await mysql("nideshop_brand").where({
      id: id
    }).select();

    goodsList = await mysql("nideshop_goods").where({
      brand_id: id
    }).select();
  }



  ctx.body = {
    "data": data[0] || {},
    goodsList
  }
}

module.exports = {
  listAction,
  detailAction
}