const socket = require("socket.io");
const crypto = require("crypto");

const getRoomId = (userID, _id) => {
    return crypto.createHash("sha256").update([userID, _id].sort().join("_")).digest("hex");
};

const initializeSocket = (server) => {
    const io = socket(server, {
        cors: {
            origin: "http://localhost:5173", // frontend URL
            methods: ["GET", "POST"],
            credentials: true,
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
