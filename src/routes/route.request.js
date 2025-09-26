const express = require("express");
const requestRouter = express.Router();
const { sendConnectionRequest } = require("../controllers/requests.controller.js")
const { authMiddleware } = require("../middlewares/auth.middleware.js")

requestRouter.post('/request/send/:status/:toUserId', authMiddleware, sendConnectionRequest)

module.exports = {
    requestRouter
}