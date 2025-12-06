const user = require("../models/user");
const { VNPay, ProductCode, VnpLocale, dateFormat, ignoreLogger } = require('vnpay');
const { v4: uuidv4 } = require("uuid");

exports.ThanhToanUrl = async (req, res) => {
    const { amount, haveCart } = req.body;
    // console.log(haveCart);
    if (amount === 'null') {
        return res.json({
            EC: 2,
            EM: "amount wrong"
        })
    }
    try {
        const [getInforUser] = await user.getUserByid(req.user.id.makh);
        if (getInforUser.status === 0) {
            return res.json({
                EC: 2,
                EM: "Tài khoản của bạn đã bị cấm liên hệ admin để mở lại"
            });
        }
        const vnpay = new VNPay({
            tmnCode: '2DW6OY6A',
            secureSecret: '76DF568DXNFVJT4J4LLSV2T6IFYGG7WS',
            vnpayHost: 'https://sandbox.vnpayment.vn',
            testMode: true,
            hashAlgorithm: 'SHA512',
            loggerFn: ignoreLogger,
        });
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const paymentUrl = vnpay.buildPaymentUrl({
            vnp_Amount: amount,
            vnp_IpAddr: '127.0.0.1',
            vnp_TxnRef: uuidv4(),
            vnp_OrderInfo: `${haveCart}`,
            vnp_OrderType: ProductCode.Other,
            vnp_ReturnUrl: 'http://localhost:3000',
            vnp_Locale: VnpLocale.VN,
            vnp_CreateDate: dateFormat(new Date()),
            vnp_ExpireDate: dateFormat(tomorrow),
        });
        return res.json(paymentUrl);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};