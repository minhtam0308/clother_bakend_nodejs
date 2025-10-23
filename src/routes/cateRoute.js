const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");

router.get("/getAllCategory", CategoryController.getAllCategory)
router.get("/getAllCategoryByAdmin", CategoryController.getAllCategoryByAdmin)


module.exports = router;