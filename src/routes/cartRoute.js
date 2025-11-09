const express = require("express");
const router = express.Router();
const CartController = require("../controllers/CartController");

router.get('/GetAllCart', CartController.GetAllCart);
router.post('/PostAddCart', CartController.PostAddCart);
router.put('/PutNumberCart', CartController.PutNumberCart);
router.delete('/DeleteFromCart', CartController.DeleteFromCart);

module.exports = router