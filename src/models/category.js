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


//big Cate
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
const getCateBigAndSmallByName = async (nameCate) => {
    const [cate] = await db.query(`
            SELECT * 
            FROM danhmuc cha
            LEFT JOIN danhmuccon con ON cha.ma_danhmuc = con.ma_danhmuc
            WHERE cha.ten_danhmuc = '${nameCate}' OR con.ten_dmc ='${nameCate}';
        `);

    return cate;
};


const postCreateCateBig = async (nameCate) => {
    const [cate] = await db.query(`
        INSERT INTO danhmuc (ten_danhmuc) 
        VALUES ('${nameCate}')
    `);

    return cate;
}
const putEditCateBig = async (id, nameCate) => {
    const [cate] = await db.query(`
        UPDATE danhmuc
        SET ten_danhmuc = '${nameCate}'
        WHERE ma_danhmuc = ${id};
    `);

    return cate;
}

const deleteCateBig = async (id) => {
    const [cate] = await db.query(`
        DELETE FROM danhmuc
        WHERE ma_danhmuc = ${id};  
    `);

    return cate;
}



//cate small
const postCreateCate = async (nameCate, idParent) => {
    const [cate] = await db.query(`
        INSERT INTO danhmuccon (ten_dmc, ma_danhmuc) 
        VALUES ('${nameCate}', '${idParent}')
    `);

    return cate;
}

const putEditCate = async (id, nameCate) => {
    const [cate] = await db.query(`
        UPDATE danhmuccon
        SET ten_dmc = '${nameCate}'
        WHERE ma_dmc = ${id};
    `);

    return cate;
}

const deleteCate = async (id) => {
    const [cate] = await db.query(`
        DELETE FROM danhmuccon
        WHERE ma_dmc = ${id}; 
    `);

    return cate;
}
module.exports = {
    getAllCate,
    getCateById,
    getAllCateBig,
    getCateByIdCateBig,
    postCreateCateBig,
    getCateBigAndSmallByName,
    putEditCateBig,
    deleteCateBig,
    postCreateCate,
    putEditCate,
    deleteCate
}