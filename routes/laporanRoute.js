const express = require("express");
const {
  hitung,
  laporanPembayaran,
  laporanSiswa,
  getKelas
} = require("../controllers/laporanController.js");
const { verifyUser, adminOnly } = require("../middleware/AuthUser.js");

const router = express.Router();

router.get("/hitung", verifyUser, hitung);
router.get("/cetak/pembayaran", verifyUser, adminOnly, laporanPembayaran);
router.get("/cetak/siswa", verifyUser, adminOnly, laporanSiswa);
router.get("/getkelas", verifyUser, adminOnly, getKelas);

module.exports = router;
