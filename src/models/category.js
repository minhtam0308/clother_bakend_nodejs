const db = require("../config/db");


const getAllCate = async () => {
    const [cate] = await db.query(`
        SELECT *
        FROM danhmuccon
        `);

    return cate;
};

const getCateById = async (id) => {
    const [cate] = await db.query(`
        SELECT *
        FROM danhmuccon
        where ma_dmc = ${id}
        `);

    return cate;
};

const getAllCateBig = async () => {
    const [cate] = await db.query(`
        SELECT *
        FROM danhmuc
        `);

    return cate;
};

const getCateByIdCateBig = async (id) => {
    const [cate] = await db.query(`
        SELECT *
        FROM danhmuccon
        where ma_danhmuc = ${id}
        `);

    return cate;
};

module.exports = {
    getAllCate,
    getCateById,
    getAllCateBig,
    getCateByIdCateBig
}