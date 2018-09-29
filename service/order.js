const {
  mysql
} = require('../mysql');
const moment = require('moment');
/** 
 * 提交订单
 * @param {string} openId
 * @param {number} goodsId
 * @param {number} goodsNumber ?
 * @param {number} allPrice
 */
async function submitOrder(openId, goodsId, goodsNumber, allPrice) {
  //是否存在在订单
  const isOrder = await mysql('nideshop_order').where({
    user_id: openId,
    goods_id: goodsId
  }).select();
  // 存在
  if (isOrder.length > 0) {
    allPrice += isOrder[0].allprice;
    goodsNumber += isOrder[0].goods_num;
    const orderData = await mysql('nideshop_order').where({
      user_id: openId,
      goods_id: goodsId
    }).update({
      goods_num: goodsNumber,
      allprice: allPrice
    })

    const orderGoodsData = await mysql("nideshop_order_goods").where({
      goods_id: goodsId
    }).update({
      number: goodsNumber,
    })
    return {
      data: orderData && orderGoodsData ? true : false
    }
  } else {
    // const data = await mysql('nideshop_order').insert({
    //   user_id: openId,
    //   goods_id: goodsId,
    //   goods_num:goodsNumber,
    //   allprice: allPrice
    // })
    const goodsDetail = await mysql("nideshop_goods").where({
      id:goodsId
    }).select();
    const orderData = await mysql('nideshop_order').insert({
      user_id: openId,
      goods_id: goodsId,
      goods_num: goodsNumber,
      allprice: allPrice
    })
    const orderGoodsData = await mysql("nideshop_order_goods").insert({
      order_id: moment().format('YYYYMMDDHHmmss') + (Math.random(0,1)*1000000).toFixed(),
      goods_id: goodsId,
      goods_name: goodsDetail[0].name,
      goods_sn: goodsDetail[0].goods_sn,
      product_id: goodsId,
      number: goodsNumber,
      retail_price: goodsDetail[0].retail_price,
      list_pic_url: goodsDetail[0].list_pic_url,
      add_time: moment().format('YYYY-MM-DD HH:mm:ss'),
      update_time: moment().format('YYYY-MM-DD HH:mm:ss')
    })
    console.log(orderData,orderGoodsData)
    return {
      data: orderData && orderGoodsData ? true : false
    }
  }
}

/** 
 * 订单详情
 * @param {string} openId
 * @param {string} addressId
 */
async function getDetail(openId, addressId) {
  const orderDetail = await mysql('nideshop_order').where({
    user_id: openId,
  }).select();

  let goodsIds = [],list = [],allPrice = 0;
  console.log(orderDetail)
  if(orderDetail.length){
    orderDetail.forEach(item => {
      allPrice += item.allprice;
      goodsIds.push(item.goods_id);
    });
    list = await mysql('nideshop_order_goods').whereIn('goods_id', goodsIds).select();
  };
  
  // const list = await mysql("nideshop_order_goods").whereIn("goods_id",goodsIds).select();
  //收货地址
  let addressList;
  if (addressId) {
    addressList = await mysql("nideshop_address")
      .where({
        user_id: openId,
        id: addressId
      }).orderBy('is_default', 'desc')
      .select();
  } else {
    addressList = await mysql("nideshop_address")
      .where({
        user_id: openId,
      }).orderBy('is_default', 'desc')
      .select();
  }

  return {
    allPrice: allPrice,
    goodsList: list,
    address: addressList[0] || {}
  }
}
module.exports = {
  submitOrder,
  getDetail
}