const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { GetAllUsers } = require("../controllers/userController");

router.get("/", (req, res) => {
    return res.send("Hello");
})
router.post("/login", authController.Login);
router.post("/register", authController.Register);
router.get("/account", GetAllUsers);
module.exports = router;