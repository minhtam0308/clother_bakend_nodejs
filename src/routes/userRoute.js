const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { GetAllUsers, PutUpLevelUser, PutEditBanUser, DeleteUser } = require("../controllers/userController");

router.get("/", (req, res) => {
    return res.send("Hello");
})
router.post("/login", authController.Login);
router.post("/register", authController.Register);
router.get("/account", GetAllUsers);
router.put("/uplevel", PutUpLevelUser);
router.put("/putEditBanUser", PutEditBanUser);
router.delete("/deleteUser", DeleteUser);
module.exports = router;