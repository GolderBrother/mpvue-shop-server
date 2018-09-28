const {
    mysql
} = require('../mysql');

/** 
 * 加入购物车
 * @param {Object} params
 */
async function addCart(params) {
    const {
        number,
        goodsId,
        openId
    } = params
    //判断购物车是否包含此数据
    const haveGoods = await mysql("nideshop_cart").where({
        "user_id": openId,
        "goods_id": goodsId
    }).select()


    //如果不存在
    if (haveGoods.length == 0) {
        const goods = await mysql("nideshop_goods").where({
            "id": goodsId
        }).select();
        const {
            retail_price,
            name,
            list_pic_url
        } = goods[0];
        const data = await mysql('nideshop_cart').insert({
            "user_id": openId,
            "goods_id": goodsId,
            number,
            "goods_name": name,
            list_pic_url,
            retail_price
        });
        return {
            data: data ? "success" : "failed"
        };
    } else {
        //如果存在
        const oldNumber = await mysql("nideshop_cart").where({
            "user_id": openId,
            "goods_id": goodsId
        }).column('number').select();
        //更新数据
        const data = await mysql("nideshop_cart").where({
            "user_id": openId,
            "goods_id": goodsId
        }).update({
            "number": oldNumber[0].number + number
        });
        return {
            data: data ? "success" : "failed"
        };
    }
}

/** 
 * 获取购物车列表
 * @param {string} openId
 */
async function getList(openId) {
    const cartList = await mysql("nideshop_cart").where({
        "user_id": openId,
    }).select();
    console.log("cartList", cartList);
    return {
        data: cartList.length ? cartList : []
    }
}

/** 
 * 删除购物车商品
 * @param {number} id
 */
async function deleteCart(id) {
    const data = await mysql("nideshop_cart").where({
        "id": id,
    }).del();
    return {
        data: data ? true : false,
        msg : data ? "success" : "failed" 
    }
}

module.exports = {
    addCart,
    getList,
    deleteCart
}