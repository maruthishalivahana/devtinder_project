const express = require("express");
const authRouter = express.Router();
const { userRegister, userLogin, userLogout } = require("../controllers/auth.controller.js")
authRouter.post('/register', userRegister)
authRouter.post('/login', userLogin);
authRouter.post('/logout', userLogout)

module.exports = {
    authRouter
}