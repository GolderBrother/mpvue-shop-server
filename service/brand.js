const {
    mysql
} = require('../mysql');

/** 
 * 获取品牌列表
 * @param {number} page
 */
async function getList(page) {
    const size = 5;
    //分页  limit：每页条数  offset：从第几条开始(索引开始值为 0)
    const data = await mysql('nideshop_brand').column('id', 'name', 'floor_price', 'app_list_pic_url').limit(size).offset((page - 1) * size).select();
    const dataAll = await mysql('nideshop_brand').column('id', 'name', 'floor_price', 'app_list_pic_url').select();
    const total = Math.ceil(dataAll.length / size);
    return {
      data,
      total
    }
}

/** 
 * 获取品牌详情
 * @param {number} id
 */
async function getDetail(id) {
  let data = {};
  let goodsList = [];
  if (id) {
    data = await mysql("nideshop_brand").where({
      id: id
    }).select();

    goodsList = await mysql("nideshop_goods").where({
      brand_id: id
    }).select();
  }
  return {
    data : data[0] || {},
    goodsList : goodsList || []
  }
}
module.exports = {
  getList,
  getDetail
}