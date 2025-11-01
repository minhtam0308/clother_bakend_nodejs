const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");

router.get("/getAllCategory", CategoryController.getAllCategory)
router.get("/getAllCategoryByAdmin", CategoryController.getAllCategoryByAdmin)
router.post("/postCreateCateBig", CategoryController.PostCreateCateBig)
router.put("/putEditCateBig", CategoryController.PutEditCateBig)
router.delete("/deleteCateBig", CategoryController.DeleteCateBig)

router.post("/postCreateCate", CategoryController.PostCreateCate)
router.put("/putEditCate", CategoryController.PutEditCate)
router.delete("/deleteCate", CategoryController.DeleteCate)


module.exports = router;