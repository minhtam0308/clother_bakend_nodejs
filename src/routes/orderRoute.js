const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/OrderController");

router.get("/getLastOrder", CategoryController.GetLastOder)
router.get("/getAllOrder", CategoryController.GetAllOrder)

router.post("/postOrder", CategoryController.PostCreateOrder)
router.delete("/deleteAllCart", CategoryController.DeleteAllCart)

router.put("/putOrder", CategoryController.PutOrder)


module.exports = router;