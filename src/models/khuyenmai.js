const db = require("../config/db");

const CheckKhuyenMai = async (ma_code) => {
    // console.log(ma_code)
    const [km] = await db.query(`
            SELECT *
            FROM khuyenmai
            WHERE ma_code = '${ma_code}'
            LIMIT 1;
        `);

    return km;
};

const putKhuyenmai = async (macode, soluongco) => {
    try {
        const [km] = await db.query(`
        UPDATE khuyenmai 
        SET da_sd=${soluongco + 1}
        WHERE ma_code ='${macode}'
        `);
        return km.insertId;
    } catch (e) {
        console.log(e);
    }

};

const getAllKhuyenMai = async () => {
    // console.log(ma_code)
    const [km] = await db.query(`
            SELECT *
            FROM khuyenmai
        `);

    return km;
};

const postCreateKM = async (ma_code, gia_tri_giam, gioi_han_su_dung, km_tu_ngay, km_den_ngay) => {
    // console.log(ma_code)
    const [km] = await db.query(`
        INSERT INTO khuyenmai 
        (ma_code, gia_tri_giam, gioi_han_su_dung, km_tu_ngay, km_den_ngay) 
        VALUES ('${ma_code}', ${gia_tri_giam}, ${gioi_han_su_dung}, '${km_tu_ngay}', '${km_den_ngay}');
        `);
    return km;

};

const deleteKM = async (ma_code) => {
    // console.log(ma_code)
    const [km] = await db.query(`
        DELETE FROM khuyenmai
        WHERE ma_code = '${ma_code}';  
        `);
    return km;

};

module.exports = {
    CheckKhuyenMai,
    putKhuyenmai,
    getAllKhuyenMai,
    postCreateKM,
    deleteKM
}