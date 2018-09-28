const addressService = require("../../service/address");
/**
 * 添加或者更新收货地址
 * @param {*} ctx
 */
async function saveAction(ctx) {
  const {
    addressId,
    userName,
    telNumber,
    address,
    detailaddress,
    checked,
    openId
  } = ctx.request.body;
  const requestParams = {
    addressId,
    userName,
    telNumber,
    address,
    detailaddress,
    checked,
    openId
  }
  const res = await addressService.saveOrAdd(requestParams);
  ctx.body = res;
}

/**
 * 收货地址列表
 * @param {*} ctx
 */
async function getListAction(ctx) {
  // var openId = ctx.query.openId;
  const {
    openId
  } = ctx.query;
  const addressList = await addressService.getList(openId);
  ctx.body = {
    data: addressList
  };
}

/**
 * 获取收货地址详情
 * @param {*} ctx
 */
async function detailAction(ctx) {
  const {
    id
  } = ctx.query;
  const detailData = await addressService.getDetail(id);
  ctx.body = {
    data: detailData
  };
}

/**
 * 删除收货地址
 * @param {*} ctx
 */
async function deleteAction(ctx) {
  const {
    id
  } = ctx.query;
  const delData = await addressService.detailAddress(id);
  ctx.body = delData;
}

module.exports = {
  saveAction,
  getListAction,
  detailAction,
  deleteAction
};