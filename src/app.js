const express = require("express")
const connectDB = require("./config/Database.js");
const { authMiddleware } = require("./middlewares/auth.middleware.js")
const { authRouter } = require("./routes/routes.auth.js")
const { profileRouter } = require("./routes/route.profile.js")
const { requestRouter } = require("./routes/route.request.js")
const { userRouter } = require('./routes/route.user.js')
const http = require("http")
const socket = require("socket.io")
const intializeSocket = require("./utils/socket.js")

const cors = require("cors")


const cookieParser = require("cookie-parser");
const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))


// middlewares that are used in the app
app.use(express.json())
app.use(cookieParser());
//routers that are used in the app
app.use('/', authRouter)
app.use('/', profileRouter)
app.use('/', requestRouter)
app.use("/", userRouter)

const port = process.env.PORT || 8080;
const server = http.createServer(app)
intializeSocket(server)

connectDB().then(() => {
    console.log("Database connected successfully")
    server.listen(port, () => {
        console.log(`server running on port ${port}`)
    })
}).catch((err) => {
    console.log("Database connection failed", err)
})





