



const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const User = require("../models/user")
const authMiddleware = async (req, res, next) => {
    try {

        // get cookies from request.cookies
        const cookies = req.cookies;
        // from the cookies get the token
        const { token } = cookies;
        // validate the token if the token is not present send a response to login first
        if (!token) {
            return res.status(401).send("please login first")
        }
        //if the token is present  verify the token
        const verifyuser = jwt.verify(token, process.env.JSON_WEB_TOKEN)
        // from the verified token get the userid
        const { id } = verifyuser
        // using the userid get the user from the database
        const users = await User.findById(id)
        // if the user is not present send a response to login again
        if (!users) {
            return res.status(401).send("user not found please login again")

        }
        // if the user is present attach the user to the request object
        req.User = users;
        // call the next middleware or router
        next();
    } catch (error) {
        return res.status(500).send("internal server error")

    }


}
module.exports = {
    authMiddleware
}
