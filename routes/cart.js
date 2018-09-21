const router = require("koa-router")();
const controllers = require("../controllers");

//1.添加购物车
router.post('/addCart', controllers.cart.index.addCart);
//2.购物车列表
router.get('/cartList', controllers.cart.index.cartList);
//3.删除商品
router.get('/deleteAction', controllers.cart.index.deleteAction);

module.exports = router;
