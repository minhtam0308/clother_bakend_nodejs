const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/", (req, res) => {
    return res.send("Hello");
})
router.post("/login", authController.Login);
router.post("/register", authController.Register);
module.exports = router;