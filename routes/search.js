const router = require("koa-router")();
const controllers = require("../controllers");

//1.关键词和搜索历史接口
router.get('/indexaction', controllers.search.index.indexAction)
//2.搜索提示接口
router.get('/helperaction', controllers.search.index.helperAction)
//3.搜索的关键词添加到数据库
router.post('/addhistoryaction', controllers.search.index.addHistoryAction)
//4.清空搜索历史
router.post('/clearhistoryAction', controllers.search.index.clearhistoryAction)

module.exports = router;