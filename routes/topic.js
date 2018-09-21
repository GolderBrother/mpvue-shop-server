const router = require("koa-router")();
const controllers = require("../controllers");

//1.列表
router.get('/listaction', controllers.topic.index.listAction)
//2.详情加下方四个专题推荐
router.get('/detailaction', controllers.topic.index.detailAction)

module.exports = router;