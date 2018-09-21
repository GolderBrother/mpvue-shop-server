const router = require("koa-router")();
const controllers = require("../controllers");

// 1.提交反馈
router.post('/submitAction', controllers.feedback.index.submitAction)

module.exports = router;