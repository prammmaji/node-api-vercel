
const express = require("express");
const db = require("./config/koneksi.js");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");
const userRoute = require("./routes/userRoute.js");
const pembayaranRoute = require("./routes/pembayaranRoute.js");
const tagihanRoute = require("./routes/tagihanRoute.js");
const siswaRoute = require("./routes/SiswaRoute.js");
const authRoute = require("./routes/authRoute.js");
const laporanRoute = require("./routes/laporanRoute.js");
const SequelizeStore = require("connect-session-sequelize");


dotenv.config()
const app = express()
(async () => {
  try {
    await db.authenticate();
    console.log("Database connected...");
    await db.sync();
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
})();
app.use('/public/images', express.static(imagePath));

const sessionStore = SequelizeStore(session.Store)

const store = new sessionStore({
    db:db,
})

app.use(bodyParser.urlencoded({extended:true})) 

app.use(session({
    secret:process.env.SESS_SECRET,
    resave:false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}))
app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳')
})
app.use(cors({
    credentials:true,
    origin:'http://localhost:3000'
}))
app.use(cookieParse())
app.use(express.json())
app.use(userRoute)
app.use(pembayaranRoute)
app.use(tagihanRoute)
app.use(siswaRoute)
app.use(authRoute)
app.use(laporanRoute)

store.sync()

app.listen(process.env.APP_PORT,() => console.log("Server running on port 5000"))
