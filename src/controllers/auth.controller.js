
const bcrypt = require("bcrypt")
const user = require("../models/user");
const jwt = require("jsonwebtoken");
const { validateSignupData } = require("../utils/validation");
const userRegister = async (req, res) => {
    try {

        // validateSignupData(req)
        const { firstName, lastName, email, password } = req.body;


        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword)

        const newUser = new user({
            firstName,
            lastName,
            email,
            password: hashedPassword,


        })

        await newUser.save();
        res.status(201).json({
            message: "user sucessfully registered"
        })
    } catch (error) {
        res.status(400).json({
            message: "somthing went wrong" + error
        })
    }
}

const JSON_WEB_TOKEN = "654183449a53ee7ba1a6e8f89f0cb3666e90ea8ac671c6c3a4614e69e4ee33f3"

const userLoign = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userdata = await user.findOne({ email: email });
        if (!userdata) {
            throw new Error("invalid cridentials")
        }
        const ispasswordValid = await bcrypt.compare(password, userdata.password)

        if (ispasswordValid) {

            const token = await jwt.sign({ id: userdata._id, }, JSON_WEB_TOKEN)

            res.cookie("token", token)
            res.status(200).json({
                token,
                message: "user login sucessfully"
            })
        } else {
            throw new Error(" invalid cridentials")
        }

    } catch (error) {
        res.status(500).json({
            message: "somthing went wrong!" + error
        })
    }
}
const profile = async (req, res) => {
    const users = req.User
    if (!users) {
        res.status(401).send("user not found please login again")
    }

    res.status(200).json({
        message: "user profile",
        user: users
    })

}
const sendConnectionRequest = async (req, res) => {
    try {
        res.status(200).json({
            message: "connection request sent",
            user: req.user
        })


    } catch (error) {
        res.status(500).json({
            message: "somthing went wrong!" + error
        })
    }
}

module.exports = {
    userRegister,
    userLoign,
    // getFeed,
    // getuserbyemail,
    // getbyUser,
    // deleteUser,
    // updateUser,
    profile,
    sendConnectionRequest
}