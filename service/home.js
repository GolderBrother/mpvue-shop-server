const {
    mysql
} = require('../mysql');

async function getHomeData() {

    //轮播数据
    const banner = await mysql('nideshop_ad').where({
        ad_position_id: 1
    }).select();

    //类型
    const channel = await mysql('nideshop_channel').select();

    //新品首发
    //这几个id有商品详情
    let newGoodsIds = await mysql('nideshop_goods').column("id").whereNot("goods_desc","").andWhere("is_new", 1).select();
    newGoodsIds = newGoodsIds.map(item => item.id);
    const newGoods = await mysql('nideshop_goods').whereIn('id', newGoodsIds).andWhere("is_new", 1).select();
    
    /**
     * 热门商品
     * 选择对象的列字段
     * retail_price  零售价
     * goods_brief   简明描述
     */
    const hotGoods = await mysql('nideshop_goods').column('id', 'name', 'list_pic_url', 'retail_price', 'goods_brief').where({
        is_hot: 1
    }).limit(5).select();
    
    /**
     * 品牌列表
     */
    const brandList = await mysql('nideshop_brand').where({
        is_new: 1
    }).orderBy("new_sort_order", 'asc').limit(4).select();
    
    /**
     * 主题列表
     */
    const topicList = await mysql('nideshop_topic').limit(3).select();
    
    /**
     * 类别列表
     */
    //1.查询到所有的主类别
    const categoryList = await mysql('nideshop_category').where({
        parent_id: 0
    }).select();
    //2.查询主类别对应的子类别
    let newCategoryList = [];
    async function getSubCategoryList(){
        let subCategoryList = [];
        for(let category of categoryList){
            let childCategoryIds = await mysql("nideshop_category").where({
                parent_id:category.id
            }).column("id").select();
            // 变为数组形式 [{id:123}] -> [123]
            childCategoryIds = childCategoryIds.map(item => item.id);
            //在商品中找到 在childCategoryIds里的七条数据
            const categoryGoods = await mysql("nideshop_goods").column('id', 'name', 'list_pic_url', 'retail_price').whereIn('category_id',childCategoryIds).limit(7).select();
            subCategoryList.push({
                "id": category.id,
                "name": category.name,
                "goodsList": categoryGoods
            });
        };
        return subCategoryList;

        //这里如果使用map就无法使用await了
        /*
            categoryList.map((item) => {

            })
            await Promise.all(categoryList.map(category => {
                let childCategoryIds = mysql("nideshop_category").where({
                    parent_id:category.id
                }).column("id").select();
                // 变为数组形式 [{id:123}] -> [123]
                childCategoryIds = childCategoryIds.map(item => item.id);
                //在商品中找到 在childCategoryIds里的七条数据
                const categoryGoods = mysql("nideshop_goods").column('id', 'name', 'list_pic_url', 'retail_price').whereIn('category_id',childCategoryIds).limit(7).select();
                subCategoryList.push({
                    "id": category.id,
                    "name": category.name,
                    "goodsList": categoryGoods
                });
            }));
        */
    }
    newCategoryList = await getSubCategoryList();
    return {
        "banner": banner,
        "channel": channel,
        "newGoods": newGoods,
        "hotGoods": hotGoods,
        "brandList": brandList,
        "topicList": topicList,
        "newCategoryList": newCategoryList,
        "message": null,
        "success": true
    }
}

module.exports = {
    getHomeData
}

