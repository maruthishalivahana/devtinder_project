const express = require("express");
const requestRouter = express.Router();
const { sendConnectionRequest, reciveConncetionRequest } = require("../controllers/requests.controller.js")
const { authMiddleware } = require("../middlewares/auth.middleware.js")

requestRouter.post('/request/send/:status/:toUserId', authMiddleware, sendConnectionRequest)
requestRouter.post('/request/review/:status/:requestId', authMiddleware, reciveConncetionRequest)
module.exports = {
    requestRouter
}