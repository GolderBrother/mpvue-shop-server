/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
  prefix: '/james'    //添加全局路由前缀
})
const controllers = require('../controllers')

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const {
  auth: {
    authorizationMiddleware,
    validationMiddleware
  }
} = require('../mysql')

// --- 登录与授权 Demo --- //
// 登录接口
router.get('/login', authorizationMiddleware, controllers.login)
// 用户信息接口（可以用来验证登录态）
router.get('/user', validationMiddleware, controllers.user)

// --- 图片上传 Demo --- //
// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中
router.post('/upload', controllers.upload)

// --- 信道服务接口 Demo --- //
// GET  用来响应请求信道地址的
router.get('/tunnel', controllers.tunnel.get)
// POST 用来处理信道传递过来的消息
router.post('/tunnel', controllers.tunnel.post)

// --- 客服消息接口 Demo --- //
// GET  用来响应小程序后台配置时发送的验证请求
router.get('/message', controllers.message.get)
// POST 用来处理微信转发过来的客服消息
router.post('/message', controllers.message.post)


//================================================================自己的接口

/**
 * 首页数据
 */
const homeRouter = require("./home");
router.use(homeRouter.routes());


/**
 *  分类
 */
const categoryRouter = require("./category");
router.use("/category",categoryRouter.routes());


/**
 *  商品相关接口
 */

const goodsRouter = require("./goods");
router.use("/goods",goodsRouter.routes());


/**
 *  专题接口
 */
const topicRouter = require("./topic");
router.use("/topic",topicRouter.routes());


/**
 * 搜索相关接口
 */

const searchRouter = require("./search");
router.use("/search",searchRouter.routes());


/**
 *  收藏相关接口
 */
const collectRouter = require("./collect");
router.use("/collect",collectRouter.routes());

/**
 *  购物车相关接口
 */
const cartRouter = require('./cart');
router.use("/cart",cartRouter.routes());


/**
 *  订单相关
 */
const orderRouter = require("./order");
router.use("/order",orderRouter.routes());

/**
 *  收货地址相关接口
 */
const addressRouter = require("./address");
router.use("/address",addressRouter.routes());


/**
 *  意见反馈
 */
const feedbackRouter = require("./feedback");
router.use("/feedback",feedbackRouter.routes());

module.exports = router
