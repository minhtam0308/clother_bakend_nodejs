const db = require("../config/db");


const getAllPro = async () => {
    const [product] = await db.query(`
        SELECT *
        FROM sanpham
        `);

    return product;
};

const getDetaiProbyid = async (id) => {
    const [product] = await db.query(`
        SELECT *
        FROM sanphambt
        Where masp = ${id}
        `);

    return product;
};

const getProbyid = async (id) => {
    const [product] = await db.query(`
        SELECT *
        FROM sanpham
        Where masp = ${id}
        `);

    return product;
};

const getProbycate = async (idCate) => {

    const product = await db.query(`
        SELECT *
        FROM sanpham
        Where ma_dmc = ${idCate}
        `);
    return product;
};

const getProbyname = async (name) => {

    const product = await db.query(`
        SELECT * 
        FROM sanpham
        WHERE tensp LIKE '%${name}%';
        `);
    return product;
};
const postCreatePro = async (tensp, hinhanh, gia, mota_sanpham, phantram_khuyenmai, ma_dmc) => {
    const [product] = await db.query(`
        INSERT INTO sanpham 
        (tensp, hinhanh, gia, mota_sanpham, phantram_khuyenmai, ma_dmc)
        VALUES
        ('${tensp}', '${hinhanh}', ${gia}, '${mota_sanpham}', '${phantram_khuyenmai}', ${ma_dmc});
        `);
    return product.insertId;
};
const postCreateProDetail = async (masp, kich_co, mausac, soluong_trongkho, anh) => {
    const [product] = await db.query(`
        INSERT INTO sanphambt (masp, kich_co, mausac, soluong_trongkho, anh)
        VALUES
        (${masp}, '${kich_co}', '${mausac}', ${soluong_trongkho}, '${anh}')
        `);
    return product.insertId;
};
const putEditPro = async (id, name, category, description, price, image) => {
    const [product] = await db.query(`
        UPDATE sanpham 
    SET tensp='${name}', hinhanh='${image}', gia=${price}, mota_sanpham='${description}', ma_dmc=${category}
    WHERE masp=${id}
        `);
    return product;
};
const delPro = async (id) => {
    const [product] = await db.query(`
        DELETE FROM sanpham WHERE masp = ${id};
        `);
    return product;
};
const putEditProDetail = async (mabt, kich_co, mausac, soluong_trongkho, anh) => {
    const [product] = await db.query(`
        UPDATE sanphambt 
        SET kich_co='${kich_co}', mausac='${mausac}', soluong_trongkho=${soluong_trongkho}, anh='${anh}'
        WHERE
        mabt=${mabt}
        `);
    return product.insertId;
};
const delProDetail = async (id) => {
    const [product] = await db.query(`
        DELETE FROM sanphambt WHERE mabt = ${id};
        `);
    return product;
};
module.exports = {
    getAllPro, getDetaiProbyid,
    getProbyid, getProbycate,
    getProbyname, postCreatePro,
    postCreateProDetail,
    putEditPro, delPro,
    putEditProDetail,
    delProDetail
}