const router = require("koa-router")();
const controllers = require("../controllers");

// 1.提交反馈
router.post('/submitAction', controllers.feedback.index.submitAction)
// 2.获取反馈列表
router.get('/getListAction',controllers.feedback.index.getListAction)
// 3.获取反馈详情
router.get('/getDetailAction',controllers.feedback.index.getDetailAction)

module.exports = router;

