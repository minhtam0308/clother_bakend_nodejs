const { getAllCate } = require("../models/category");
const { getAllPro, getDetaiProbyid, getProbyid } = require("../models/product");

exports.getAllCategory = async (req, res) => {
    const results = await getAllCate();
    // console.log(results)

    return res.json(results);

};


