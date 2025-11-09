
const db = require("../config/db");

const getTotalRevenue = async () => {
    try {
        const [stat] = await db.query(`
            SELECT SUM(thanh_tien) as total, ngay_lap
            FROM chi_tiet_don_hang ct
            INNER JOIN donhang dh ON ct.ma_dh = dh.ma_dh
            WHERE ct.trangthai = 'da_giao'
            AND ngay_lap >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
            GROUP BY DATE_FORMAT(ngay_lap, '%Y-%m')
            ORDER BY ngay_lap;

        `);

        return stat;
    } catch (e) {
        console.log(e)
    }

}
const getTotalOrders = async () => {

    try {
        const [stat] = await db.query(`
        SELECT COUNT(*) as total, ngay_lap
        FROM donhang
        WHERE ngay_lap >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
        GROUP BY DATE_FORMAT(ngay_lap, '%Y-%m')
        ORDER BY ngay_lap;
        `);

        return stat;
    } catch (e) {
        console.log(e)
    }
}
const getTotalProducts = async () => {
    try {
        const [stat] = await db.query(`
        SELECT COUNT(*) as need
        FROM sanphambt
        `);
        return stat;
    } catch (e) {
        console.log(e)
    }
}
const getTotalCustomers = async () => {
    try {
        const [stat] = await db.query(`
        SELECT COUNT(*) as need
        FROM user
        `);
        return stat;
    } catch (e) {
        console.log(e)
    }
}
const getOrdersData = async () => {
    try {
        const [stat] = await db.query(`
            SELECT ngay_lap, ct.trangthai as trangthai, COUNT(*) as soluong
            FROM chi_tiet_don_hang ct
            INNER JOIN donhang dh ON ct.ma_dh = dh.ma_dh
            WHERE ngay_lap >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
            GROUP BY DATE_FORMAT(ngay_lap, '%Y-%m'), ct.trangthai
            ORDER BY ngay_lap;
        `);
        return stat;
    } catch (e) {
        console.log(e)
    }
}

const getCateData = async () => {
    const [cate] = await db.query(`
        SELECT dm.ten_dmc as name, COUNT(sp.masp) as value
        FROM danhmuccon dm
        INNER JOIN sanpham sp ON dm.ma_dmc = sp.ma_dmc
        INNER JOIN sanphambt spbt ON sp.masp = spbt.masp
        GROUP BY dm.ten_dmc
        `);

    return cate;
};
module.exports = {
    getTotalRevenue,
    getTotalOrders,
    getTotalProducts,
    getTotalCustomers,
    getOrdersData,
    getCateData
}