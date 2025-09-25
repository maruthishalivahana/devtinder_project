const express = require("express");
const profileRouter = express.Router();
const { profile } = require("../controllers/profile.controller.js")
const { authMiddleware } = require("../middlewares/auth.middleware.js")
const { profileEdit, editPassword } = require("../controllers/profileEdit.controller.js")
profileRouter.get('/profile', authMiddleware, profile)
profileRouter.patch('/profile/edit', authMiddleware, profileEdit)
profileRouter.patch('/profile/edit/password', authMiddleware, editPassword)

module.exports = {
    profileRouter
}