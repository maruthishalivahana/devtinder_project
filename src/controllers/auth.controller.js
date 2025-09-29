
const bcrypt = require("bcrypt")
const user = require("../models/user");
const jwt = require("jsonwebtoken");
const { validateSignupData } = require("../utils/validation");
const userRegister = async (req, res) => {
    try {

        // validateSignupData(req)
        const { firstName, lastName, email, password, photourl, age, skills, gender, about } = req.body;


        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword)

        const newUser = new user({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            photourl,
            age,
            skills,
            gender,
            about


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



const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userdata = await user.findOne({ email: email });
        if (!userdata) {
            res.status(400).json({
                message: " invalid cridentials"
            })
        }
        const ispasswordValid = await userdata.validatepassword(password)

        if (ispasswordValid) {

            const token = await userdata.getJWT();

            res.cookie("token", token)
            res.status(200).json({
                token,
                message: "user login sucessfully",
                user: userdata
            })
        } else {
            res.status(400).json({
                message: " invalid cridentials"
            })
        }

    } catch (error) {
        res.status(400).json({
            message: "somthing went wrong!" + error
        })
    }
}


const userLogout = async (req, res) => {
    try {

        res.clearCookie("token")
        res.status(200).json({
            message: "user logout sucessfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "somthing went wrong!" + error
        })
    }
}

module.exports = {
    userRegister,
    userLogin,
    userLogout,
}