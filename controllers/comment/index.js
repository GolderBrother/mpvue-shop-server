const {
    mysql
} = require('../../mysql');
const commentService = require("../../service/comment");
async function postAction(ctx) {
    const {
        openId,
        goodsId,
        content
    } = ctx.request.body;
    const res = await commentService.postComment({
        openId,
        goodsId,
        content
    })
    ctx.body = res;
}
async function deleteComment() {

}

module.exports = {
    postAction
}