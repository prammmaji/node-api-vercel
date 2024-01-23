const express = require("express");
const { getSiswa, findSiswa, addSiswa, deleteSiswa, updateSiswa } = require("../controllers/siswaControllers.js");
const { verifyUser, adminOnly } = require("../middleware/AuthUser.js");

const router = express.Router();

router.get("/siswa", verifyUser, getSiswa);
router.get("/siswa/:id", verifyUser, adminOnly, findSiswa);
router.post("/siswa", verifyUser, addSiswa);
router.patch("/siswa/:id", verifyUser, adminOnly, updateSiswa);
router.delete("/siswa/:id", verifyUser, adminOnly, deleteSiswa);

module.exports = router;
