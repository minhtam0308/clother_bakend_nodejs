
const user = require("../models/user");

exports.GetAllUsers = async (req, res) => {
    try {
        const userAccount = await user.getAllUser();
        const result = userAccount.filter((item) => {
            if (item.makh !== req.user.id.makh) {
                let { matkhau, ...resu } = item;
                return resu;
            }

        })
        return res.json(result)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};

exports.PutUpLevelUser = async (req, res) => {

    const { id, role } = req.body;
    // console.log(id, role)
    if (!id || !role) {
        return res.status(200).json({
            EC: 1,
            EM: "not enough data"
        })
    }
    try {
        const userAccount = await user.putUpLevelUser(id, role);
        // console.log(userAccount)
        return res.json(userAccount)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};


exports.PutEditBanUser = async (req, res) => {

    const { id, status } = req.body;
    // console.log(id, status)
    if (!id || status === null || status === undefined) {
        return res.status(200).json({
            EC: 1,
            EM: "not enough data"
        })
    }
    try {
        const userAccount = await user.putEditBanUser(id, status);
        // console.log(userAccount)
        return res.json(userAccount)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};
exports.DeleteUser = async (req, res) => {

    const { id } = req.query;
    // console.log(id, status)
    if (!id) {
        return res.status(200).json({
            EC: 1,
            EM: "not enough data"
        })
    }
    try {
        const [userAccount] = await user.getUserByid(id);
        if (userAccount) {
            const results = await user.deleteUser(id);
            return res.status(200).json({
                EC: 0,
                EM: results
            })
        } else {
            return res.status(200).json({
                EC: 2,
                EM: "Tài khoản không tồn tại"
            })
        }
        // return res.json(userAccount)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ EC: 3, message: error.message });
    }

};
