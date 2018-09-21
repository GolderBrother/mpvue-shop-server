const router = require("koa-router")();
const controllers = require("../controllers");

//1.提交订单
router.post('/submitAction', controllers.order.index.submitAction)
//2.订单详情
router.get('/detailAction', controllers.order.index.detailAction)

module.exports = router;