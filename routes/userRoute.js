const express = require("express");
const {
  getUser,
  getUserById,
  createUser,
  createAdmin,
  updateUser,
  deleteUser
} = require("../controllers/userController.js");
const { verifyUser, adminOnly } = require("../middleware/AuthUser.js");

const router = express.Router();

router.get("/users", verifyUser, adminOnly, getUser);
router.get("/users/:id", verifyUser, getUserById);
router.post("/users", verifyUser, adminOnly, createUser);
router.post("/admin", verifyUser, adminOnly, createAdmin);
router.patch("/users/:id", verifyUser, updateUser);
router.delete("/users/:id", verifyUser, adminOnly, deleteUser);

module.exports = router;
