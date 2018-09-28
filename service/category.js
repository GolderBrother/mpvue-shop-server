const {
    mysql
} = require('../mysql');

/** 
 * 获取一级分类 
 * @param {number} categoryId
 */
async function getAllList(categoryId) {
    //默认获取一级分类ID为0，获取对应的子分类
    // let data = await mysql("nideshop_category").where({
    //     "parent_id": 0
    // }).select();
    const category = await mysql("nideshop_category").where({
        "parent_id": categoryId || 0
    }).select();
    // let currentCategory = [];
    // // 如果有传一级分类ID，就获取对应的子分类
    // if (categoryId) {
    //     currentCategory = await mysql("nideshop_category").where({
    //         "parent_id": categoryId
    //     }).select();
    //     data = currentCategory;
    // }
    return {
        categoryList: category.length ? category : []
    }
}

/** 
 * 根据一级分类获取二级分类
 * @param {number} categoryId
 */
async function getCurrentList(categoryId) {
    const CurrentData = {};
    //获取第一个一级分类
    let currentOne = await mysql("nideshop_category").where({
        "id": categoryId
    }).select();
    let subList = [];
    //获取第一个一级分类的子分类
    if (currentOne.length) {
        subList = await mysql("nideshop_category").where({
            "parent_id": currentOne[0].id
        }).select();
    };
    CurrentData.currentOne = currentOne.length ? currentOne[0] : {};
    CurrentData.currentOne["subList"] = subList;
    return {
        data: CurrentData
    };
}

/** 
 * 根据二级分类获取同类
 * 1.需要头部导航包含的分类
 * 2.查找导航上分类对应的商品
 * @param {number} categoryId
 */
async function getSubList(categoryId) {
    //获得当前二级分类
    const currentNav = await mysql("nideshop_category").where({
        "id": categoryId
    }).select();
    let navData = [];
    if (currentNav.length) {
        //获得当前二级分类的同类
        navData = await mysql("nideshop_category").where({
            "parent_id": currentNav[0].parent_id
        });
    };
    return {
        navData,
        currentNav: currentNav[0] || {}
    }
}
module.exports = {
    getAllList,
    getCurrentList,
    getSubList
}