const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductControllers");

router.get("/getAllPro", productController.getAllProducts)
router.get("/getDetailProductsById", productController.getDetailProductsById)
router.get("/getProductsById", productController.getProductsById)
router.get("/getProductsByCate", productController.getProductsByCate)
router.post("/getProductsByName", productController.getProductsByName)
router.post("/postCreateProduct", productController.postCreateProduct)
router.post("/postCreateProductDetail", productController.postCreateProductDetail)
router.put("/putEditPro", productController.putEditProduct)
router.delete("/delProduct", productController.delProduct)

module.exports = router;