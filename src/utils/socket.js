const socket = require("socket.io");
const crypto = require("crypto");

const getRoomId = (userID, _id) => {
    return crypto.createHash("sha256").update([userID, _id].sort().join("_")).digest("hex");
};

const initializeSocket = (server) => {
    const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:5173', 'http://localhost:3000'];

    const io = socket(server, {
        cors: {
            origin: allowedOrigins,
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            credentials: true,
            allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"]
        },
    });

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        socket.on("joinchat", ({ userID, _id }) => {
            console.log("Received IDs:", userID, _id);
            const room = getRoomId(userID, _id); // <-- pass arguments here
            socket.join(room);
            console.log("Joined room:", room);
        });

        socket.on("sendMessage", ({ firstName, userID, _id, text }) => {
            const roomId = getRoomId(userID, _id);
            console.log(firstName + " : " + text);
            io.to(roomId).emit("messageRecived", { firstName, text });
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
};

module.exports = initializeSocket;
