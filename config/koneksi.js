const { Sequelize } = require("sequelize");
const mysql2 = require("mysql2");
const db = new Sequelize('freedb_pembayaran_spp', 'freedb_user-new', 'cDzU6$7C%pH!&S*' , {
    host: 'sql.freedb.tech',
    port: 3306,
    dialect: 'mysql',
    dialectModule: 'mysql2'
})

module.exports = db;

