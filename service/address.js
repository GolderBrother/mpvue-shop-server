const {
  mysql
} = require("../mysql.js");

/**
 * 添加或者更新收货地址
 * @param {Object} params
 */
async function saveOrAdd(params) {
  const {
    addressId,
    userName,
    telNumber,
    address,
    detailaddress,
    checked,
    openId
  } = params;
  //如果是默认选中
  //先在数据库查询是否有默认的地址
  if (checked) {
    const isDefault = await mysql("nideshop_address").where({
      user_id: openId,
      is_default: 1
    });
    // 有的话将所有的默认地址 置为0
    if (isDefault.length > 0) {
      await mysql("nideshop_address")
        .where({
          user_id: openId,
          is_default: 1
        })
        .update({
          is_default: 0
        });
    }
  }

  // 没有就添加 有就更新
  if (!addressId) {
    //添加地址
    const data = await mysql("nideshop_address").insert({
      name: userName,
      mobile: telNumber,
      address: address,
      address_detail: detailaddress,
      user_id: openId,
      is_default: checked == "true" || checked ? 1 : 0
    });
    return {
      data: data ? true : false
    };
  } else {
    //更新地址
    const data = await mysql("nideshop_address")
      .where({
        id: addressId
      })
      .update({
        name: userName,
        mobile: telNumber,
        address: address,
        address_detail: detailaddress,
        user_id: openId,
        is_default: checked == "true" || checked ? 1 : 0
      });
    return {
      data: data ? true : false,
      msg: data ? 'success' : 'failed'
    };
  }
}


/**
 * 收货地址列表
 * @param {string} openId
 */
async function getList(openId) {
  const addressList = await mysql("nideshop_address")
    .where({
      user_id: openId
    }).orderBy('is_default', 'desc')
    .select();
  if (addressList && addressList.length) {
    return addressList;
  }
  return [{}];
}

/**
 * 获取收货地址详情
 * @param {number} id
 */
async function getDetail(id) {
  const detailData = await mysql("nideshop_address")
    .where({
      id: id
    })
    .select();
  if (detailData.length && detailData[0]) {
    return detailData[0];
  }
  return {};
}

/**
 * 删除收货地址
 * @param {number} id
 */
async function detailAddress(id) {
  const delData = await mysql("nideshop_address")
    .where({
      id: id
    })
    .del();
  return {
    data: delData ? true : false,
    msg: delData ? "success" : "The address was not found"
  }
}


module.exports = {
  saveOrAdd,
  getList,
  getDetail,
  detailAddress
}