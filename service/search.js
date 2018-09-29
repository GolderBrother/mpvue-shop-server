const {
    mysql
} = require('../mysql');

/**
 * 初始化获取热的关键字和历史关键字
 * @param {*} openId
 */
async function getIndexKeywords(openId) {
    // 默认关键词
    const defaultKeyword = await mysql('nideshop_keywords').where({
        is_default: 1
    }).limit(1).select();
    // 取出热的关键词
    const hotKeywordList = await mysql('nideshop_keywords').distinct('keyword').column('keyword', 'is_hot').limit(10).select();
    const historyData = await mysql('nideshop_search_history').where({
        "user_id": openId
    }).limit(10).select();
    return {
        "defaultKeyword": defaultKeyword[0] || {},
        "hotKeywordList": hotKeywordList,
        "historyData": historyData
    }
}

/** 
 * 根据关键字 模糊搜索 关键字数据列表
 * @param {string} keyword
 * @param {string} order
 */
async function getHelperKeywords(keyword, order) {
    let orderBy = "";
    if (!order) {
        order = '';
        orderBy = "id"
    } else {
        orderBy = "retail_price"
    }
    const keywords = await mysql("nideshop_goods").orderBy(orderBy, order).column('id', 'name', 'list_pic_url', 'retail_price').where("name", 'like', '%' + keyword + '%').limit(10).select();
    return {
        keywords: keyword ? keywords : []
    }
}

/** 
 * 添加搜索历史
 * @param {string} openId
 * @param {string} keyword
 */
async function addSearchHistory(openId, keyword) {
    console.log(openId,keyword)
    const oldData = await mysql('nideshop_search_history').where({
        "user_id": openId,
        "keyword": keyword
    });
    if (oldData.length == 0) {
        const data = await mysql('nideshop_search_history').insert({
            "user_id": openId,
            "keyword": keyword,
            "add_time": parseInt(new Date().getTime() / 1000)
        })
        return {
            data: data ? "success" : "fail"
        }
    } else {
        return {
            data: "Already recorded"
        }
    }
}

/** 
 * 删除搜索历史
 * @param {string} openId
 */
async function delSearchHistory(openId) {
    const data = await mysql('nideshop_search_history').where({
        "user_id": openId
    }).del();
    return {
        "data": data ? "delete successfully" : "delete failed"
    }
}

module.exports = {
    getIndexKeywords,
    getHelperKeywords,
    addSearchHistory,
    delSearchHistory
}