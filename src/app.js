const express = require("express")
const connectDB = require("./config/Database.js");
const { authMiddleware } = require("./middlewares/auth.middleware.js")
const { authRouter } = require("./routes/routes.auth.js")
const { profileRouter } = require("./routes/route.profile.js")
const { requestRouter } = require("./routes/route.request.js")
const { userRouter } = require('./routes/route.user.js')

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


const port = 3000;
connectDB().then(() => {
    console.log("Database connected successfully")
    app.listen(port, () => {
        console.log(`server running on port ${port}`)
    })
}).catch((err) => {
    console.log("Database connection failed", err)
})





