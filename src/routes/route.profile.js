const express = require("express");
const profileRouter = express.Router();
const { profile } = require("../controllers/profile.controller.js")
const { authMiddleware } = require("../middlewares/auth.middleware.js")
profileRouter.get('/profile', authMiddleware, profile)


module.exports = {
    profileRouter
}