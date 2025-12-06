const express = require("express");
const router = express.Router();
const thanhToanController = require("../controllers/ThanhToanController");


router.post("/thanhtoan", thanhToanController.ThanhToanUrl);

module.exports = router;