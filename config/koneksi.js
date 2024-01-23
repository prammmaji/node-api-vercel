import { Sequelize } from "sequelize"
import mysql from "mysql2";

export const db = new Sequelize('freedb_pembayaran_spp', 'freedb_user-new', 'cDzU6$7C%pH!&S*' , {
    host: 'sql.freedb.tech',
    port: 3306,
    dialect: 'mysql',
    dialectModule: mysql2
})

