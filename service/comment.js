const {
    mysql
} = require('../mysql');

/** 
 * 提交评论
 * @param {Object} params
 */
async function postComment(params) {
    const {
        openId,
        goodsId,
        content
    } = params
    const buffer = Buffer.from(content);
    const typeId = 0;
    const insertId = await mysql('nideshop_comment').insert({
        type_id: typeId,
        value_id: goodsId,
        content: buffer.toString('base64'),
        add_time: new Date().getTime(),
        user_id: openId
    });
    return {
        data: insertId ? "success" : "failed",
        message: insertId ? "add successfully" : "add failed"
    };
}

/** 
 * 删除评论
 * @param {Object} params
 */
async function deleteComment() {

}

module.exports = {
    postComment
}