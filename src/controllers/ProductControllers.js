const { getCateById } = require("../models/category");
const { getAllPro, getDetaiProbyid, getProbyid, getProbycate, getProbyname, postCreatePro, postCreateProDetail, putEditPro, delPro } = require("../models/product");

exports.getAllProducts = async (req, res) => {
    const results = await getAllPro();

    // console.log(results)

    // Optional: format date or handle NULL values
    let result = [];
    for (const item of results) {
        let categorya = await getCateById(item.ma_dmc);
        result.push({
            id: item.masp,
            name: item.tensp,
            category: categorya[0].ten_dmc,
            description: item.mota_sanpham,
            price: item.gia,
            image: item.hinhanh,
        })
    }


    return res.json(result);

};


exports.getDetailProductsById = async (req, res) => {
    const { id } = req.query;
    // console.log(req)
    if (!id) {
        return res.status(200).json({
            EC: 1,
            EM: "ID"
        })
    }

    try {
        const results = await getDetaiProbyid(id);
        // console.log(results)
        return res.json(results);
    } catch (err) {
        return res.status(500);
    }

};


exports.getProductsById = async (req, res) => {
    const { id } = req.query;
    // console.log(req)
    if (!id) {
        return res.status(200).json({
            EC: 1,
            EM: "ID"
        })
    }
    try {
        const [results] = await getProbyid(id);
        // console.log(results)
        return res.json(results);
    } catch (err) {
        return res.status(500);
    }

};

exports.getProductsByCate = async (req, res) => {
    const { idCate } = req.query;
    // console.log(req)
    if (!idCate) {
        return res.status(200).json({
            EC: 1,
            EM: "ID"
        })
    }
    try {
        const results = await getProbycate(idCate);
        // console.log(results)
        return res.json(results);
    } catch (err) {
        return res.status(500);
    }

};


exports.getProductsByCate = async (req, res) => {
    const { idCate } = req.query;
    // console.log(req)
    if (!idCate) {
        return res.status(200).json({
            EC: 1,
            EM: "ID"
        })
    }
    try {
        const [results] = await getProbycate(idCate);
        // console.log(results)
        return res.json(results);
    } catch (err) {
        return res.status(500);
    }

};

exports.getProductsByName = async (req, res) => {
    const { name } = req.body;
    // console.log(req)
    if (!name) {
        return res.status(200).json({
            EC: 1,
            EM: "name"
        })
    }
    try {
        const [results] = await getProbyname(name.trim());
        // console.log(results)
        return res.json(results);
    } catch (err) {
        return res.status(500);
    }

};
exports.postCreateProduct = async (req, res) => {
    let { tensp, hinhanh, gia, mota_sanpham, phantram_khuyenmai, ma_dmc } = req.body;
    // console.log(req)
    if (!tensp || !gia || !ma_dmc) {
        return res.status(200).json({
            EC: 1,
            EM: "not enought"
        })
    }
    if (!hinhanh) {
        hinhanh = null;
    }
    if (!mota_sanpham) {
        mota_sanpham = "";
    }
    if (!phantram_khuyenmai) {
        phantram_khuyenmai = 0;
    }
    try {
        const results = await postCreatePro(tensp, hinhanh, gia, mota_sanpham, phantram_khuyenmai, ma_dmc);
        return res.json(results);
    } catch (err) {
        console.log(err);
        return res.status(500);
    }

};

exports.postCreateProductDetail = async (req, res) => {
    let { masp, kich_co, mausac, soluong_trongkho, anh } = req.body;
    // console.log(req)
    if (!masp || !kich_co || !mausac || !soluong_trongkho) {
        return res.status(200).json({
            EC: 1,
            EM: "not enought"
        })
    }
    if (!anh) {
        anh = null;
    }

    try {
        const results = await postCreateProDetail(masp, kich_co, mausac, soluong_trongkho, anh);
        return res.json(results);
    } catch (err) {
        console.log(err);
        return res.status(500);
    }

};
exports.putEditProduct = async (req, res) => {
    let { id, name, category, description, price, image } = req.body;
    // console.log("asdasdasd")
    if (!name || !category || !price || !id) {
        return res.status(200).json({
            EC: 1,
            EM: "not enought"
        })
    }
    if (!image) {
        image = null;
    }
    if (!description) {
        description = ""
    }

    try {
        const results = await putEditPro(id, name, category, description, price, image);
        return res.json(results);
    } catch (err) {
        console.log(err);
        return res.status(500);
    }

};


exports.delProduct = async (req, res) => {
    let { id } = req.query;
    // console.log("asdasdasd")
    if (!id) {
        return res.status(200).json({
            EC: 1,
            EM: "not enought"
        })
    }

    try {
        const results = await delPro(id);
        return res.json(results);
    } catch (err) {
        console.log(err);
        return res.status(500);
    }

};