const express require("express");
const { getAllPembayaran,getPembayaranById,addPembayaran,updatePembayaran,deletePembayaran,midtrans, cekSudahBayar, belumBayar } require("../controllers/pembayaranController.js");
const { adminOnly, verifyUser } require("../middleware/AuthUser.js");


const router = express.Router();


router.get("/pembayaran",verifyUser, getAllPembayaran);
router.get("/pembayaran/:id",verifyUser, getPembayaranById);
router.post("/pembayaran",verifyUser,addPembayaran);
router.patch("/pembayaran/:id",verifyUser,adminOnly, updatePembayaran);
router.delete("/pembayaran/:id",verifyUser,adminOnly, deletePembayaran);
router.post("/pembayaran/midtrans",verifyUser, midtrans);
router.get("/cekBayar/:id",verifyUser, cekSudahBayar);
router.get("/belumBayar/:id",verifyUser,adminOnly, belumBayar);
module.exports = router;
