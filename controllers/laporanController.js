import User from "../models/userModel.js";
import Tagihan from "../models/tagihanModel.js";
import Pembayaran from "../models/pembayaranModel.js";
import Siswa from "../models/siswaModel.js";
import {Sequelize,QueryTypes}  from "sequelize";
import db from "../config/koneksi.js";

const sequelize = db;

export const hitung = async (req, res) => {
  try {
    const query = `
      SELECT
        (SELECT COUNT(*) FROM tagihan WHERE STATUS='Aktif') AS jumlahTagihan,
        (SELECT COUNT(*) FROM siswa) AS jumlahSiswa,
        (SELECT COUNT(*) FROM USER) AS jumlahUser,
        (SELECT COUNT(*) FROM pembayaran WHERE status_pembayaran='Berhasil') AS jumlahPembayaran
      FROM
        tagihan, siswa, USER, pembayaran
      LIMIT 1;
    `;

    const counts = await sequelize.query(query, { type: QueryTypes.SELECT });
    const result = counts[0];

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

export const laporanPembayaran = async (req, res) => {
    const {kelas,tagihan} = req.query;
    let query
    try {
      
    
    if(kelas === '' && tagihan !==''){
      query = `
        SELECT u.nama, s.nomor_induk, s.kelas, t.nama_tagihan,t.tahun_ajaran,t.nominal, p.tgl_pembayaran
        FROM USER u JOIN siswa s ON u.id = s.userId JOIN pembayaran p ON s.userId = p.userId 
        JOIN tagihan t ON p.tagihanId = t.id
        WHERE p.tagihanId = "${tagihan}"
        ORDER BY s.nomor_induk ASC, s.kelas ASC,t.nama_tagihan ASC,t.tahun_ajaran ASC
      `;
    } else if (kelas !== '' && tagihan ===''){
      query = `
      SELECT u.nama, s.nomor_induk, s.kelas, t.nama_tagihan,t.tahun_ajaran,t.nominal, p.tgl_pembayaran
      FROM USER u JOIN siswa s ON u.id = s.userId JOIN pembayaran p ON s.userId = p.userId JOIN tagihan t ON p.tagihanId = t.id 
      WHERE s.kelas = "${kelas}"
      ORDER BY s.nomor_induk ASC, s.kelas ASC,t.nama_tagihan ASC,t.tahun_ajaran ASC
          `;
    } else if (kelas !== '' && tagihan !=='') {
      query = `
      SELECT u.nama, s.nomor_induk, s.kelas, t.nama_tagihan,t.tahun_ajaran,t.nominal, p.tgl_pembayaran
      FROM USER u JOIN siswa s ON u.id = s.userId JOIN pembayaran p ON s.userId = p.userId JOIN tagihan t ON p.tagihanId = t.id 
      WHERE s.kelas = "${kelas}" AND p.tagihanId = "${tagihan}"
      ORDER BY s.nomor_induk ASC, s.kelas ASC,t.nama_tagihan ASC,t.tahun_ajaran ASC
          `;
    } else {
      query = `
      SELECT u.nama, s.nomor_induk, s.kelas, t.nama_tagihan,t.tahun_ajaran,t.nominal, p.tgl_pembayaran
      FROM USER u JOIN siswa s ON u.id = s.userId JOIN pembayaran p ON s.userId = p.userId JOIN tagihan t ON p.tagihanId = t.id 
      ORDER BY s.nomor_induk ASC, s.kelas ASC,t.nama_tagihan ASC,t.tahun_ajaran ASC
          `;
    }
    const counts = await sequelize.query(query, { type: QueryTypes.SELECT });
    const result = counts;
    res.json(result);
  } catch (error) {
    res.status(500).json({msg: error.message})
  }
}
export const laporanSiswa = async (req, res) => {
  const {kelas} = req.query;
  let query
  try {
    if(kelas === ''){
      query = `
        SELECT u.nama, s.nomor_induk, s.kelas,s.tgl_lahir,s.alamat
        FROM USER u JOIN siswa s ON u.id = s.userId
        ORDER BY s.nomor_induk ASC, s.kelas ASC
      `;
    } else {
      query = `
      SELECT u.nama, s.nomor_induk, s.kelas,s.tgl_lahir,s.alamat
      FROM USER u JOIN siswa s ON u.id = s.userId
      WHERE s.kelas = "${kelas}"
      ORDER BY s.nomor_induk ASC, s.kelas ASC
      `;
    }
    const counts = await sequelize.query(query, { type: QueryTypes.SELECT });
    const result = counts;
    res.json(result);
  } catch (error) {
    res.status(500).json({msg: error.message})
  }
}
export const getKelas = async (req, res) => {
  const {kelas} = req.query;
  let query
  try {
      query = `
        SELECT DISTINCT kelas FROM siswa ORDER BY kelas ASC
      `;
    const counts = await sequelize.query(query, { type: QueryTypes.SELECT });
    const result = counts;
    res.json(result);
  } catch (error) {
    res.status(500).json({msg: error.message})
  }
}