const { Sequelize } = require("sequelize");

export const db = new Sequelize('freedb_pembayaran_spp', 'freedb_user-new', 'cDzU6$7C%pH!&S*' , {
    host: 'sql.freedb.tech',
    port: 3306,
    dialect: 'mysql'
})

