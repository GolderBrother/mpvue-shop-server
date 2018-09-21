const router = require("koa-router")();
const controllers = require("../controllers");

//1.添加收藏
router.post('/addcollect', controllers.collect.index.addCollect)
//2.获取收藏列表
router.get('/listAction', controllers.collect.index.listAction)
//3.删除收藏列表
router.get('/deleteCollect', controllers.collect.index.deleteCollect)

module.exports = router;