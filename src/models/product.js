const db = require("../config/db");


const getAllPro = async () => {
    const [product] = await db.query(`
        SELECT s.*, COALESCE(SUM(sbt.soluong_trongkho), 0) AS total_stock 
        FROM sanpham s
        LEFT JOIN sanphambt sbt ON s.masp = sbt.masp
        GROUP BY s.masp;
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
        SELECT DISTINCT s.*
        FROM sanpham s
        INNER JOIN sanphambt sbt ON s.masp = sbt.masp
        Where s.ma_dmc = ${idCate}
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

const getAllProClient = async () => {
    const [product] = await db.query(`
        SELECT DISTINCT s.*
        FROM sanpham s
        INNER JOIN sanphambt sbt ON s.masp = sbt.masp
        `);
    return product;
};

const getSumProapi = async (masp, mausac, kichco) => {
    // console.log(typeof kichco)
    try {
        // vì khi truyền bằng hàm này null truyền vào sẽ thành 'null'
        const [product] = await db.query(`
        SELECT SUM(soluong_trongkho) AS soluong
        FROM sanphambt
        WHERE masp = ?
        AND ( ? IS NULL OR mausac = ? )
        AND ( ? IS NULL OR kich_co = ? );
        `, [masp, mausac, mausac, kichco, kichco]);
        // in ra sql
        // console.log(db.format(`
        // SELECT SUM(soluong_trongkho) AS soluong
        // FROM sanphambt
        // WHERE masp = ?
        // AND ( ? IS NULL OR mausac = ? )
        // AND ( ? IS NULL OR kich_co = ? );
        // `, [masp, mausac, mausac, kichco, kichco]));
        return product;
    } catch (e) {
        console.log(e)
    }

};

const getSoluongPro = async (mabt) => {
    try {
        const [product] = await db.query(`
        SELECT soluong_trongkho 
        FROM sanphambt
        WHERE mabt=${mabt};
        `);
        return product;
    }
    catch (e) {
        console.log(e);
    }
}

const putEditProSoluong = async (mabt, soluong) => {
    try {
        const [product] = await db.query(`
        UPDATE sanphambt 
        SET soluong_trongkho=${soluong}
        WHERE mabt=${mabt}
        `);
        return product.insertId;
    } catch (e) {
        console.log(e);
    }

};

const getInforProToBuy = async (mabt) => {
    // console.log(idUser);
    try {
        const [proInf] = await db.query(`
        SELECT 
            sbt.mabt,
            s.masp,
            s.tensp,
            s.hinhanh,
            s.gia,
            s.mota_sanpham,
            s.phantram_khuyenmai,
            sbt.kich_co,
            sbt.mausac,
            sbt.soluong_trongkho
        FROM sanphambt sbt 
        LEFT JOIN sanpham s ON s.masp = sbt.masp
        WHERE sbt.mabt = ${mabt};
        `);
        return proInf;

    } catch (e) {
        console.log(e);
    }

}

module.exports = {
    getAllPro, getDetaiProbyid,
    getProbyid, getProbycate,
    getProbyname, postCreatePro,
    postCreateProDetail,
    putEditPro, delPro,
    putEditProDetail,
    delProDetail,
    getAllProClient, getSumProapi,
    getSoluongPro, putEditProSoluong,
    getInforProToBuy
}