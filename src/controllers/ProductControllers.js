const { getCateById } = require("../models/category");
const { getAllPro, getDetaiProbyid, getProbyid, getProbycate, getProbyname, postCreatePro, postCreateProDetail, putEditPro, delPro, putEditProDetail, delProDetail, getAllProClient, getSumProapi } = require("../models/product");

exports.getAllProducts = async (req, res) => {
    const results = await getAllPro();

    // console.log(results)
    // return res.json(results);

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
            khuyenmai: item.phantram_khuyenmai,
            total_stock: item.total_stock
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
        const resultsDetail = await getDetaiProbyid(id);
        const [resultPro] = await getProbyid(id);
        // console.log(resultPro)
        results = { pro: resultPro, detail: resultsDetail }
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
    const { idCate, tendm } = req.query;
    // console.log(req.query)
    if (!idCate || !tendm) {
        return res.status(200).json({
            EC: 1,
            EM: "ID"
        })
    }
    try {
        const [results] = await getProbycate(idCate);
        let result = [];
        for (const item of results) {
            result.push({
                id: item.masp,
                name: item.tensp,
                category: tendm,
                description: item.mota_sanpham,
                price: item.gia,
                image: item.hinhanh,
                khuyenmai: item.phantram_khuyenmai
            })
        }
        // console.log(results)
        return res.json(result);
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

exports.postCreateDetailPro = async (req, res) => {
    let { idParent, image, size, color, quantity } = req.body;
    if (!idParent || !image || !size || !color || !quantity) {
        return res.status(200).json({
            EC: 1,
            EM: "not enought"
        })
    }

    try {
        const results = await postCreateProDetail(idParent, size, color, quantity, image);
        return res.json(results);
    } catch (err) {
        console.log(err);
        return res.status(500);
    }

};

exports.putDetailPro = async (req, res) => {
    let { id, image, size, color, quantity } = req.body;
    if (!id || !image || !size || !color || !quantity) {
        return res.status(200).json({
            EC: 1,
            EM: "not enought"
        })
    }

    try {
        const results = await putEditProDetail(id, size, color, quantity, image);
        return res.json(results);
    } catch (err) {
        console.log(err);
        return res.status(500);
    }

};
exports.delDetailPro = async (req, res) => {
    let { id } = req.query;
    if (!id) {
        return res.status(200).json({
            EC: 1,
            EM: "ID"
        })
    }

    try {
        const results = await delProDetail(id);
        return res.json(results);
    } catch (err) {
        console.log(err);
        return res.status(500);
    }

};

exports.getAllProByClient = async (req, res) => {
    try {
        const results = await getAllProClient();
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
                khuyenmai: item.phantram_khuyenmai
            })
        }


        return res.json(result);
    } catch (err) {
        console.log(err);
        return res.status(500);
    }

};

exports.getSumProduct = async (req, res) => {
    let { masp, mausac, kichco } = req.query;
    // console.log(req.query)
    //vì khi truyền lên biến kichco bị biến thành 'null'
    // console.log(typeof kichco)
    if (kichco === 'undefined') {
        kichco = null;
    }
    if (mausac === 'undefined') {
        mausac = null;
    }

    if (!masp) {
        return res.json({
            EC: 1,
            EM: "masp"
        })
    }
    try {
        const [results] = await getSumProapi(masp, mausac, kichco);
        // console.log(results)

        return res.json(results);
    } catch (err) {
        console.log(err);
        return res.status(500);
    }

};