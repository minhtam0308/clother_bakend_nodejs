const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/KhuyenMaiController");

router.get("/checkkhuyenmai", CategoryController.CheckKhuyenMaiController)
router.get("/getAllKM", CategoryController.GetAllKhuyenMai)
router.post("/postCreateKM", CategoryController.PostCreateKM)
router.delete("/deleteKM", CategoryController.DeleteKM)


module.exports = router;