const router = require("koa-router")();
const controllers = require("../controllers");

//1.保存和更新收货地址
router.post('/saveAction', controllers.address.index.saveAction)
//2.获取收货地址列表
router.get('/getListAction', controllers.address.index.getListAction)
//3.获取收货地址详情
router.get('/detailAction', controllers.address.index.detailAction)
//4.删除收货地址
router.get('/deleteAction', controllers.address.index.deleteAction)

module.exports = router;