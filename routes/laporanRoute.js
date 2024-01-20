import express from "express";
import { hitung, laporanPembayaran, laporanSiswa, getKelas } from "../controllers/laporanController.js"
import { verifyUser, adminOnly } from "../middleware/AuthUser.js"

const router = express.Router();

router.get("/hitung", verifyUser, hitung);
router.get("/cetak/pembayaran", verifyUser, adminOnly, laporanPembayaran);
router.get("/cetak/siswa", verifyUser, adminOnly, laporanSiswa);
router.get("/getkelas", verifyUser, adminOnly, getKelas);

export default router;