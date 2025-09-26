const express = require("express")
const userRouter = express.Router()
const { getConncetionsRequests, getConncetions } = require('../controllers/user.controller')
const { authMiddleware } = require('../middlewares/auth.middleware')
userRouter.get('/user/Request', authMiddleware, getConncetionsRequests)
userRouter.get('/user/conncetions', authMiddleware, getConncetions)

module.exports = {
    userRouter
}