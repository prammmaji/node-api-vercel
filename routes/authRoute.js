const express = require("express");
const { me, Login, Logout } = require("../controllers/authController.js");

const router = express.Router();

router.get("/me", me);
router.post("/login", Login);
router.delete("/logout", Logout);

module.exports = router;
