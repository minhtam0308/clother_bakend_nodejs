const { getAllCate, getAllCateBig, getCateByIdCateBig } = require("../models/category");
const { getAllPro, getDetaiProbyid, getProbyid } = require("../models/product");

exports.getAllCategory = async (req, res) => {
    const results = await getAllCate();
    // console.log(results)

    return res.json(results);

};


exports.getAllCategoryByAdmin = async (req, res) => {
    const results = await getAllCateBig();
    // console.log(results)
    let final = [];
    try {
        for (const cate of results) {
            const cateSmall = await getCateByIdCateBig(cate.ma_danhmuc);
            final.push({
                id: cate.ma_danhmuc,
                name: cate.ten_danhmuc,
                subcategories: cateSmall.map(item => {
                    return {
                        id: item.ma_dmc,
                        name: item.ten_dmc
                    }

                })
            })
        }

        return res.json(final);
    } catch (err) {
        console.log(err)
    }


};