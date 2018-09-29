const {
    mysql
} = require('../mysql');

/**
 * 获取专题列表
 * @param {number} page
 */
async function getList(page) {
    const size = 5;
    //这里做分页处理
    const data = await mysql("nideshop_topic").column('id', 'title', 'price_info', 'scene_pic_url', 'subtitle').limit(size).offset((page - 1) * size);
    const dataAll = await mysql("nideshop_topic").column('id', 'title', 'price_info', 'scene_pic_url', 'subtitle').select();
    const total = parseInt(dataAll.length / 5);
    return {
        "page": page,
        "total": total,
        "data": data
    }
}

/**
 * 获取专题详情
 * @param {number} id
 */
async function getDetail(id) {
    let data = [];
    if (id) {
        data = await mysql('nideshop_topic').where({
            "id": id
        }).select();
    }
    const recommendList = await mysql("nideshop_topic").column('id', 'title', 'price_info', 'scene_pic_url', 'subtitle').limit(4).select();
    return {
        "data": data[0],
        "recommendList": recommendList
    }
}

module.exports = {
    getList,
    getDetail
}