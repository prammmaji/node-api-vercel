const express = require("express");
const {
  getTagihan,
  createTagihan,
  getTagihanById,
  updateTagihan,
  deleteTagihan,
  getTagihanAktif
} = require("../controllers/tagihanConttollers.js");
const { verifyUser, adminOnly } = require("../middleware/AuthUser.js");

const router = express.Router();

router.get("/tagihan/all", verifyUser, adminOnly, getTagihan);
router.get("/tagihan/aktif", verifyUser, getTagihanAktif);
router.get("/tagihan/:id", verifyUser, getTagihanById);
router.post("/tagihan", verifyUser, adminOnly, createTagihan);
router.patch("/tagihan/:id", verifyUser, adminOnly, updateTagihan);
router.delete("/tagihan/:id", verifyUser, adminOnly, deleteTagihan);

module.exports = router;
