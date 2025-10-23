
const user = require("../models/user");

exports.GetAllUsers = async (req, res) => {


    try {
        const userAccount = await user.getAllUser();
        const result = userAccount.map((item) => {
            let { matkhau, ...resu } = item;
            return resu;
        })
        return res.json(result)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};

