const {
    mysql
} = require('../mysql');

/**
 * 添加收藏
 * @param {Object} params
 */
async function addCollect(params) {
    const {
        openId,
        goodsId
    } = params;
    //判断是否收藏过
    const isCollect = await mysql("nideshop_collect").where({
        "user_id": openId,
        "value_id": goodsId
    }).select();
    let res = 0;
    if (isCollect.length == 0) {
        res = await mysql('nideshop_collect').insert({
            "user_id": openId,
            "value_id": goodsId
        });
        console.log(res);
    };
    return {
        data: res ? "success" : "failed"
    }
}

/**
 * 获取收藏列表
 * @param {string} openId
 */
async function getCollectList(openId) {
    const data = await mysql("nideshop_collect").where({
        "user_id": openId,
    }).select();
    let goodsIds = [];
    data.forEach((item) => {
        goodsIds.push(item.value_id);
    })
    const listData = await mysql("nideshop_goods").whereIn('id', goodsIds).column('id', 'name', 'list_pic_url', 'retail_price', 'goods_brief').select();
    return {
        collectGoodsList: listData
    }
}

/**
 * 删除收藏
 * @param {Obejct} params
 */
async function delCollect(params) {
    const { openId, goodsId } = params;
    const data = await mysql("nideshop_collect").where({
      "user_id":openId,
      "value_id":goodsId
    }).del();
    return {
      'data': data ? "删除成功" : "删除失败"
    }
}
module.exports = {
    addCollect,
    getCollectList,
    delCollect
}