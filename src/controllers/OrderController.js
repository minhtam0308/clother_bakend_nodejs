const { deleteAllCart } = require("../models/cart");
const { putKhuyenmai, CheckKhuyenMai } = require("../models/khuyenmai");
const { getLastOder, postOrder, postOrderDetail, getAllOrder, getDetailByIdOrder, putOrder, getAllOrderByIdUser } = require("../models/order");
const { getSoluongPro, putEditProSoluong } = require("../models/product");
const { getUserByid, updateNumberPhone } = require("../models/user");

exports.GetLastOder = async (req, res) => {
    const [resultsOder] = await getLastOder(req.user.id.makh);
    const [inforUser] = await getUserByid(req.user.id.makh);
    // console.log({ order: resultsOder, inforUser })
    if (!inforUser.so_dienthoai) {
        return res.json(null);
    }

    return res.json({ order: resultsOder, inforUser });

};


exports.PostCreateOrder = async (req, res) => {
    const { ma_km, tennguoinhan, giamgia, so_dienthoai, noi_giao, list } = req.body;
    try {
        const [getInforUser] = await getUserByid(req.user.id.makh);
        if (getInforUser.status === 0) {
            return res.json({
                EC: 2,
                EM: "Tài khoản của bạn đã bị cấm liên hệ admin để mở lại"
            });
        }
        const createOder = await postOrder(req.user.id.makh, ma_km, noi_giao, giamgia, tennguoinhan);
        // console.log(createOder.insertId);
        for (const item of list) {
            const [sl] = await getSoluongPro(item.id_pro);
            if (sl.soluong_trongkho < item.soluong) {
                return res.json("Số lượng đã hết");
            }
            // console.log(sl);
            await putEditProSoluong(item.id_pro, sl.soluong_trongkho - item.soluong);
            await postOrderDetail(createOder.insertId, item.id_pro, item.kich_co,
                item.mausac, item.soluong, item.gia, item.hinhanh, item.tensp);

            // console.log(item);
        }
        if (ma_km) {
            const [checkKM] = await CheckKhuyenMai(ma_km);
            if (checkKM) {
                await putKhuyenmai(ma_km, checkKM.da_sd);
            }
        }

        await updateNumberPhone(req.user.id.makh, so_dienthoai);
        return res.json("Đặt hàng thành công");
    } catch (e) {
        return res.json("Lỗi");

    }


};

exports.DeleteAllCart = async (req, res) => {
    try {

        await deleteAllCart(req.user.id.makh);
        return res.json("Xóa thành công");
    } catch (e) {
        return res.json("Lỗi");

    }


};

exports.GetAllOrder = async (req, res) => {
    try {

        const allorder = await getAllOrder();

        let result = [];
        for (let item of allorder) {
            let varTemp = {
                id: item.ma_dh,
                customerName: item.tennguoinhan,
                phone: item.so_dienthoai,
                email: item.email,
                address: item.diachi,
                status: fixStatus(item.trangthai),
                paymentMethod: item.phuongthuc,
                createdAt: formatDate(item.ngay_lap),
                giamgia: item.giamgia
            }
            let detail = await getDetailByIdOrder(item.ma_dh);
            let items = []
            detail.map((val) => {
                items.push({
                    id: val.mabt,
                    name: val.tensp,
                    size: val.size,
                    color: val.color,
                    quantity: val.soluong,
                    price: val.don_gia,
                    image: val.anh
                },)
            })
            varTemp.items = items;
            result.push(varTemp);
        }

        return res.json(result);
    } catch (e) {
        return res.json("Lỗi");

    }


};

const fixStatus = (status) => {
    if (status === "da_giao") {
        return "shipping";
    } else if (status === "cho_xu_ly") {
        return "pending";
    } else if (status === "huy") {
        return "cancelled";
    } else if (status === "hoan_thanh") {
        return "completed";
    } else if (status === "da_xac_nhan") {
        return "confirmed";
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
}


exports.PutOrder = async (req, res) => {
    const { iddh, trangthai } = req.body;
    try {
        const updateOrder = await putOrder(iddh, fixStatusreverst(trangthai));
        return res.json(updateOrder);
    } catch (e) {
        return res.json("Lỗi");

    }


};

const fixStatusreverst = (status) => {
    if (status === "shipping") {
        return "da_giao";
    } else if (status === "pending") {
        return "cho_xu_ly";
    } else if (status === "cancelled") {
        return "huy";
    } else if (status === "completed") {
        return "hoan_thanh";
    } else {
        return "da_xac_nhan";
    }
}


exports.GetAllOrderByIdUser = async (req, res) => {
    try {

        const allorder = await getAllOrderByIdUser(req.user.id.makh);

        let result = [];
        for (let item of allorder) {
            let varTemp = {
                id: item.ma_dh,
                customerName: item.tennguoinhan,
                phone: item.so_dienthoai,
                email: item.email,
                address: item.diachi,
                status: fixStatus(item.trangthai),
                paymentMethod: item.phuongthuc,
                createdAt: formatDate(item.ngay_lap),
                giamgia: item.giamgia,
                diachi: item.noi_giao
            }
            let detail = await getDetailByIdOrder(item.ma_dh);
            let items = []
            detail.map((val) => {
                items.push({
                    id: val.mabt,
                    name: val.tensp,
                    size: val.size,
                    color: val.color,
                    quantity: val.soluong,
                    price: val.don_gia,
                    image: val.anh
                },)
            })
            varTemp.items = items;
            result.push(varTemp);
        }

        return res.json(result);
    } catch (e) {
        return res.json("Lỗi");

    }


};
