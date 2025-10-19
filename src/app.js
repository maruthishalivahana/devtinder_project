const express = require("express");
const connectDB = require("./config/Database.js");
const { authRouter } = require("./routes/routes.auth.js");
const { profileRouter } = require("./routes/route.profile.js");
const { requestRouter } = require("./routes/route.request.js");
const { userRouter } = require('./routes/route.user.js');
const http = require("http");
const socket = require("socket.io");
const initializeSocket = require("./utils/socket.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// Detect environment

// Allowed origins
app.use(cors({
    origin: "https://dev-tinder-web-pearl-kappa.vercel.app", // only your deployed frontend
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Routers
app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);
app.use('/', userRouter);

const port = process.env.PORT || 8080;
const server = http.createServer(app);
initializeSocket(server);

connectDB()
    .then(() => {
        console.log("Database connected successfully");
        server.listen(port, "0.0.0.0", () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((err) => {
        console.log("Database connection failed", err);
    });
