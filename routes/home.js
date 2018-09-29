const router = require("koa-router")();
const controllers = require("../controllers");

//首页数据
//1.首页
router.get('/index/index', controllers.home.index.homeAction);
//2.首页品牌制造商直供的详情内的列表数据
router.get('/brand/listaction', controllers.brand.index.listAction);
//3.首页品牌制造商直供的详情数据
router.get('/brand/detailaction', controllers.brand.index.detailAction);

module.exports = router;