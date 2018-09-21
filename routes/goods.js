const router = require("koa-router")();
const controllers = require("../controllers");

//1.商品详情接口
router.get('/detailaction', controllers.goods.index.detailAction);
//2.获取商品列表
router.get('/goodsList', controllers.goods.index.goodsList);

module.exports = router;