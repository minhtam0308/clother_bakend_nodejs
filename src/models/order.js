const db = require("../config/db");

const getLastOder = async (idUser) => {
    const [order] = await db.query(`
            SELECT *
            FROM donhang
            WHERE makh = ${idUser}
            ORDER BY ngay_lap DESC
            LIMIT 1;
        `);

    return order;
};

const postOrder = async (idUser, ma_code, noigiao, giamgia, tennguoinhan) => {
    const [order] = await db.query(`
        INSERT INTO donhang (makh, ma_km, noi_giao, giamgia, tennguoinhan) 
        VALUES (${idUser}, '${ma_code}', '${noigiao}', ${giamgia}, '${tennguoinhan}')
        `);

    return order;
};

const postOrderDetail = async (madh, mahang, size, color, soluong, dongia, anh, tensp) => {
    try {
        const [order] = await db.query(`
        INSERT INTO chi_tiet_don_hang ( ma_dh, mabt, size, color, soluong, don_gia, anh, tensp) 
        VALUES (${madh}, ${mahang}, '${size}', '${color}', ${soluong}, ${dongia}, '${anh}', '${tensp}')
        `);
        return order;

    } catch (e) {
        console.log(e);
    }
};

const getAllOrder = async (idUser) => {
    const [order] = await db.query(`
            SELECT dh.ma_dh, dh.tennguoinhan, u.so_dienthoai, u.email, dh.noi_giao, ct.trangthai, dh.phuongthuc, dh.ngay_lap, dh.giamgia
            FROM donhang dh
            INNER JOIN chi_tiet_don_hang ct 
            ON dh.ma_dh = ct.ma_dh
            INNER JOIN user u ON u.makh = dh.makh
            GROUP BY dh.ma_dh, dh.tennguoinhan, u.so_dienthoai, u.email, dh.noi_giao, ct.trangthai, dh.phuongthuc, dh.ngay_lap, dh.giamgia
        `);

    return order;
};

const getDetailByIdOrder = async (madh) => {
    const [order] = await db.query(`
            SELECT *
            FROM chi_tiet_don_hang
            WHERE ma_dh = ${madh}
        `);

    return order;
};

const putOrder = async (iddh, trangthai) => {
    try {
        const [order] = await db.query(`
        UPDATE chi_tiet_don_hang
        SET trangthai = '${trangthai}'
        WHERE ma_dh  = ${iddh}
        `);

        return order;
    } catch (e) {
        console.log(e);
    }

};

module.exports = {
    getLastOder,
    postOrder,
    postOrderDetail,
    getAllOrder,
    getDetailByIdOrder,
    putOrder
}