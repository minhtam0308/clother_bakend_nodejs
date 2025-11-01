const { getAllCate, getAllCateBig, getCateByIdCateBig, getCateBigAndSmallByName, postCreateCateBig, putEditCateBig, deleteCateBig, postCreateCate, putEditCate, deleteCate } = require("../models/category");
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


exports.PostCreateCateBig = async (req, res) => {
    const { nameCate } = req.body;
    if (!nameCate) {
        return res.status(200).json({
            EC: 1,
            EM: "Data is not enough"
        })
    }
    const checkName = await getCateBigAndSmallByName(nameCate);
    if (checkName.length !== 0) {
        return res.status(200).json({
            EC: 2,
            EM: "Tên danh mục đã tồn tại"
        })
    }
    try {
        const result = await postCreateCateBig(nameCate);
        return res.status(200).json({
            EC: 0,
            EM: result
        })
    } catch (err) {
        console.log(err)
    }

};

exports.PutEditCateBig = async (req, res) => {
    const { nameCate, id } = req.body;
    if (!nameCate || !id) {
        return res.status(200).json({
            EC: 1,
            EM: "Data is not enough"
        })
    }
    const checkName = await getCateBigAndSmallByName(nameCate);
    if (checkName.length !== 0) {
        return res.status(200).json({
            EC: 2,
            EM: "Tên danh mục đã tồn tại"
        })
    }
    try {
        const result = await putEditCateBig(id, nameCate);
        return res.status(200).json({
            EC: 0,
            EM: result
        })
    } catch (err) {
        console.log(err)
    }

};

exports.DeleteCateBig = async (req, res) => {
    const { id, nameCate } = req.query;
    // console.log(req.query)
    if (!id || !nameCate) {
        return res.status(200).json({
            EC: 1,
            EM: "Data is not enough"
        })
    }
    const checkName = await getCateBigAndSmallByName(nameCate);
    if (checkName.length === 0) {
        return res.status(200).json({
            EC: 2,
            EM: "Danh mục không tồn tại"
        })
    }
    try {
        const result = await deleteCateBig(id);
        return res.status(200).json({
            EC: 0,
            EM: result
        })
    } catch (err) {
        console.log(err)
    }

};

exports.PostCreateCate = async (req, res) => {
    const { idParent, nameCate } = req.body;
    // console.log(req.query)
    if (!idParent || !nameCate) {
        return res.status(200).json({
            EC: 1,
            EM: "Data is not enough"
        })
    }
    const checkName = await getCateBigAndSmallByName(nameCate);

    if (checkName.length !== 0) {
        return res.status(200).json({
            EC: 2,
            EM: "Danh mục đã tồn tại"
        })
    }
    try {
        const result = await postCreateCate(nameCate, idParent);
        return res.status(200).json({
            EC: 0,
            EM: result
        })
    } catch (err) {
        console.log(err)
    }

};

exports.PutEditCate = async (req, res) => {
    const { id, nameCate } = req.body;
    // console.log(req.query)
    if (!id || !nameCate) {
        return res.status(200).json({
            EC: 1,
            EM: "Data is not enough"
        })
    }
    const checkName = await getCateBigAndSmallByName(nameCate);

    if (checkName.length !== 0) {
        return res.status(200).json({
            EC: 2,
            EM: "Danh mục đã tồn tại"
        })
    }
    try {
        const result = await putEditCate(id, nameCate);
        return res.status(200).json({
            EC: 0,
            EM: result
        })
    } catch (err) {
        console.log(err)
    }

};

exports.DeleteCate = async (req, res) => {
    const { id, nameCate } = req.query;
    // console.log(req.query)
    if (!id || !nameCate) {
        return res.status(200).json({
            EC: 1,
            EM: "Data is not enough"
        })
    }
    const checkName = await getCateBigAndSmallByName(nameCate);

    if (checkName.length === 0) {
        return res.status(200).json({
            EC: 2,
            EM: "Danh mục không tồn tại"
        })
    }
    try {
        const result = await deleteCate(id);
        return res.status(200).json({
            EC: 0,
            EM: result
        })
    } catch (err) {
        console.log(err)
    }

};