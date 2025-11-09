const { postAddCart, getAllCart, putNumberCart, getInforInCart, deleteFromCart } = require("../models/cart");

// Cart hơi không bảo mật :))
exports.PostAddCart = async (req, res) => {
    const { idPro, number } = req.body;
    // console.log(req)
    if (!idPro || !number) {
        return res.status(200).json({
            EC: 1,
            EM: "not enough data"
        })
    }
    try {
        const checkCart = await getAllCart(req.user.id.makh);
        //check count pro in cart
        const proAgain = checkCart.find((val) => val.id_pro === idPro);
        let results;
        if (proAgain) {
            let newNumber = number + proAgain.soluong;
            results = await putNumberCart(proAgain.id_gio, newNumber)
        } else {
            results = await postAddCart(req.user.id.makh, idPro, number);
        }
        // console.log(results)
        return res.json(results);
    } catch (err) {
        return res.status(500);
    }
}

exports.GetAllCart = async (req, res) => {
    try {
        const results = await getInforInCart(req.user.id.makh);
        // console.log(results)
        return res.json(results);
    } catch (err) {
        return res.status(500);
    }
}

exports.PutNumberCart = async (req, res) => {
    const { idCart, number } = req.body;

    try {
        const results = await putNumberCart(idCart, number);
        // console.log(results)
        return res.json(results);
    } catch (err) {
        return res.status(500);
    }
}

exports.DeleteFromCart = async (req, res) => {
    const { idCart } = req.query;
    if (!idCart) {
        return res.json({
            EC: 1,
            EM: "Not enought data"
        })
    }
    try {
        const results = await deleteFromCart(idCart);
        // console.log(results)
        return res.json({
            EC: 0,
            EM: results
        });
    } catch (err) {
        return res.status(500);
    }
}