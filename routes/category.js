const router = require("koa-router")();
const controllers = require("../controllers");

//1.分类和子类
router.get('/indexaction', controllers.category.index.indexAction)
//2.通过分类的id来查询子类接口
router.get('/currentaction', controllers.category.index.currentAction)
//3.获取导航数据
router.get('/categoryNav', controllers.category.index.categoryNav)

module.exports = router;

