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



module.exports = {
    getAllCate,
    getCateById
}