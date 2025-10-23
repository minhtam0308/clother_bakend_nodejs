const jwt = require("jsonwebtoken");
const user = require("../models/user");
const bcrypt = require("bcryptjs");
exports.Login = async (req, res) => {
    const { email, password } = req.body;
    // console.log(req.body);
    if (!email || !password) {
        return res.json({
            EC: 1,
            EM: "Not enough data"
        })
    }
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);
    // console.log(hashedPassword);
    try {
        const [userAccount] = await user.getUser(email);
        if (!userAccount) {
            return res.status(200).json({
                EC: 2,
                EM: "Email is not exist"
            })
        }
        const isMatch = await bcrypt.compare(password, userAccount.matkhau);
        if (email !== userAccount.email || !isMatch) {
            return res.json({
                EC: 1,
                EM: "Password wrong"
            })
        }
        let { matkhau, ...userData } = userAccount;
        const payload = { id: userAccount, role: userAccount.role };
        const secret = process.env.JWT_SECRET || "my-secret-key";

        const accessToken = jwt.sign(payload, secret, { expiresIn: "300h" });
        return res.status(200).json({
            EC: 0,
            EM: userData,
            accessToken
        })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};


exports.Register = async (req, res) => {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) {
        return res.json({
            EC: 1,
            EM: "Not enough data"
        })
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        //kiểm tra tài khoản đã tồn tại chưa
        const [userAccount] = await user.getUser(email);
        if (userAccount) {
            return res.status(200).json({
                EC: 3,
                EM: "Email was exist"
            })
        }
        const postInfor = await user.postUser(fullname, email, hashedPassword);
        //
        // console.log(postInfor.insertId)
        // if (!userAccount) {
        //     return res.json({
        //         EC: 2,
        //         EM: "Email is not exist"
        //     })
        // }
        // const isMatch = await bcrypt.compare(password, userAccount.password_hash);
        // if (email !== userAccount.email || !isMatch) {
        //     return res.json({
        //         EC: 1,
        //         EM: "Password wrong"
        //     })
        // }
        // let { password_hash, ...userData } = userAccount;
        // const payload = { id: userAccount, role: userAccount.role };
        // const secret = process.env.JWT_SECRET || "my-secret-key";

        // const accessToken = jwt.sign(payload, secret, { expiresIn: "1m" });
        if (!postInfor) {
            return res.status(200).json({
                EC: 2,
                EM: "Register fail"
            })
        }
        return res.status(200).json({
            EC: 0,
            EM: "Register success"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }

}