const db = require("../config/db");

const postAddCart = async (idUser, idPro, number) => {
    const [cart] = await db.query(`
        INSERT INTO giohang (id_user, id_pro, soluong)
        VALUES (${idUser}, ${idPro}, ${number});
        `);

    return cart;
};

const putNumberCart = async (idCart, number) => {
    const [cart] = await db.query(`
        UPDATE giohang
        SET soluong = '${number}'
        WHERE id_gio  = ${idCart}
        `);

    return cart;
};

const getAllCart = async (idUser) => {
    const [cart] = await db.query(`
        SELECT *
        FROM giohang
        where id_user = ${idUser}
        `);

    return cart;
}

const getInforInCart = async (idUser) => {
    // console.log(idUser);
    try {
        const [cart] = await db.query(`
        SELECT 
            g.id_gio,
            g.soluong,
            g.id_pro,
            s.masp,
            s.tensp,
            s.hinhanh,
            s.gia,
            s.mota_sanpham,
            s.phantram_khuyenmai,
            sbt.kich_co,
            sbt.mausac,
            sbt.soluong_trongkho
        FROM giohang g
        LEFT JOIN sanphambt sbt ON g.id_pro = sbt.mabt
        LEFT JOIN sanpham s ON s.masp = sbt.masp
        WHERE g.id_user = ${idUser};
        `);
        return cart;

    } catch (e) {
        console.log(e);
    }

}


const deleteFromCart = async (idCart) => {
    const [cart] = await db.query(`
        DELETE FROM giohang
        WHERE id_gio  = ${idCart}; 
        `);

    return cart;
}

const getNumberCart = async (idUser) => {
    const [cart] = await db.query(`
        SELECT COUNT(*) as number
        FROM giohang
        where id_user = ${idUser}
        GROUP BY id_user
        `);

    return cart;
}

const deleteAllCart = async (idUser) => {
    try {
        const [cart] = await db.query(`
        DELETE FROM giohang
        WHERE id_user  = ${idUser}; 
        `);

        return cart;
    } catch (e) {
        console.log(e);
    }

}


module.exports = {
    postAddCart,
    getAllCart,
    putNumberCart,
    getInforInCart,
    deleteFromCart,
    getNumberCart,
    deleteAllCart
}