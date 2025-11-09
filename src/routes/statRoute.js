const express = require("express");
const router = express.Router();
const StatController = require("../controllers/StatController");


router.get('/GetStat', StatController.GetStat);
router.get('/GetOrdersData', StatController.GetOrdersData);
router.get('/GetRevenue', StatController.GetRevenue);
router.get('/GetCategoryData', StatController.GetCategoryData);


module.exports = router