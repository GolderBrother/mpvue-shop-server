const {
  mysql
} = require('../../mysql');
const categoryService = require("../../service/category");
async function indexAction(ctx) {
  //ctx.query 获取get请求的参数对象的形式
  const {
    id: categoryId
  } = ctx.query;
  const categoryList = await categoryService.getAllList(categoryId);
  ctx.body = categoryList;
}
//点击左侧分类时获取右侧对应的分类
async function currentAction(ctx) {
  const {
    id: categoryId
  } = ctx.query;
  const currentData = await categoryService.getCurrentList(categoryId)
  ctx.body = currentData;
}


//获取分类列表
//1.需要头部导航包含的分类
//2.查找导航上分类对应的商品
async function categoryNav(ctx) {
  const { id: categoryId } = ctx.query;
  const subCategoryList = await categoryService.getSubList(categoryId);
  ctx.body = subCategoryList;
}


module.exports = {
  indexAction,
  currentAction,
  categoryNav
}