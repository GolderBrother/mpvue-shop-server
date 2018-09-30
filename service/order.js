const {
  mysql
} = require('../mysql');
const moment = require('moment');

// 订单中存在此商品 就更新 goods_num allprice
async function submitGoodsByExits(openId, order, goodsNumber, goodsAllPrice) {
  goodsAllPrice += order.allprice;
  goodsNumber += order.goods_num;
  const orderData = await mysql('nideshop_order').where({
    user_id: openId,
    goods_id: order.goods_id
  }).update({
    goods_num: goodsNumber,
    allprice: goodsAllPrice
  })

  const orderGoodsData = await mysql("nideshop_order_goods").where({
    goods_id: order.goods_id
  }).update({
    number: goodsNumber,
  });

  return {
    orderData,
    orderGoodsData
  }
}

// 订单中不存在此商品 就新增
async function submitGoodsByNotExist(openId, goodsId, goodsNumber, goodsAllPrice) {
  let submitRes = false;
  const goodsDetail = await mysql("nideshop_goods").where({
    id: goodsId
  }).select();
  const orderData = await mysql('nideshop_order').insert({
    user_id: openId,
    goods_id: goodsId,
    goods_num: goodsNumber,
    allprice: goodsAllPrice
  });
  const orderGoodsData = await mysql("nideshop_order_goods").insert({
    order_id: moment().format('YYYYMMDDHHmmss') + (Math.random(0, 1) * 1000000).toFixed(),
    goods_id: goodsId,
    goods_name: goodsDetail[0].name,
    goods_sn: goodsDetail[0].goods_sn,
    product_id: goodsId,
    number: goodsNumber,
    retail_price: goodsDetail[0].retail_price,
    list_pic_url: goodsDetail[0].list_pic_url,
    add_time: moment().format('YYYY-MM-DD HH:mm:ss'),
    update_time: moment().format('YYYY-MM-DD HH:mm:ss')
  });
  submitRes = orderData && orderGoodsData;
  return submitRes;
}

/** 
 * 提交订单
 * @param {string} openId
 * @param {number|string} goodsId
 * @param {number|string} goodsNumber
 * @param {number|string} goodsPrice
 * @param {string} submitType 
 * @description submitType:提交类型 购物车提交 cart 商品详情立即购买 buy
 */

// 将数字转换成数组
function numberToArr(num, setString) {
  let arr = [];
  arr.push(setString ? num.toString() : num);
  return arr;
}
async function submitOrder(openId, goodsId, goodsNumber, goodsPrice, submitType) {
  //是否存在在订单
  let isOrder = [];
  let goodsIds = [];
  let goodsNums = [];
  let goodsPrices = [];
  // 已存在的goodsId arr
  let exitGoodsIds = [];
  // 不存在的goodsId arr
  let unExitGoodsIds = [];

  goodsIds = submitType === "buy" ? numberToArr(goodsId, true) : goodsId.split(",");
  goodsNums = submitType === "buy" ? numberToArr(goodsNumber, false) : goodsNumber.split(",").map(item => +item);
  goodsPrices = submitType === "buy" ? numberToArr(goodsPrice, false) : goodsPrice.split(",").map(item => +item);

  isOrder = await mysql('nideshop_order').andWhere({
    user_id: openId
  }).whereIn(
    "goods_id", goodsIds
  ).select();

  // 存在订单 更新订单信息
  if (isOrder.length > 0) {
    exitGoodsIds = isOrder.map(({
      goods_id
    }) => goods_id);
    unExitGoodsIds = exitGoodsIds.map(x => {
      let _goodsIds = goodsIds;
      _goodsIds = _goodsIds.filter(y => y !== x);
      return _goodsIds;
    })[exitGoodsIds.length - 1];

    for (let order of isOrder) {
      const goodsNumber = goodsNums[goodsIds.findIndex(id => id === order.goods_id)],
        goodsAllPrice = goodsPrices[goodsIds.findIndex(id => id === order.goods_id)];
      const {
        orderData,
        orderGoodsData
      } = await submitGoodsByExits(openId, order, goodsNumber, goodsAllPrice);
      return {
        data: orderData && orderGoodsData ? true : false
      }
    };
  } else {
    unExitGoodsIds = goodsIds;
  }
  // 不存在订单 新增订单信息
  if (unExitGoodsIds.length > 0) {
    let submitResult = true;
    const goodsNumber = goodsNums[goodsIds.findIndex(id => id === goodsId)],
      goodsAllPrice = goodsPrices[goodsIds.findIndex(id => id === goodsId)];
    for (let goodsId of unExitGoodsIds) {
      submitResult = true;
      const submitRes = await submitGoodsByNotExist(openId, goodsId, goodsNumber, goodsAllPrice);
      // 有一个不成功，就标记为false
      if (submitRes) {
        submitResult = false;
      };
    };
    return {
      data: submitResult ? true : false
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

  let goodsIds = [],
    list = [],
    allPrice = 0;
  if (orderDetail.length) {
    orderDetail.forEach(item => {
      allPrice += item.allprice;
      goodsIds.push(item.goods_id);
    });
    list = await mysql('nideshop_order_goods').whereIn('goods_id', goodsIds).select();
  };

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