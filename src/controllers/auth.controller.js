const bcrypt = require("bcrypt");
const user = require("../models/user");
const jwt = require("jsonwebtoken");

const userRegister = async (req, res) => {
    try {
        const { firstName, lastName, email, password, photourl, age, skills, gender, about } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

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
        });

        const savedUser = await newUser.save();
        const token = await savedUser.getJWT();

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,        // Cloud Run uses HTTPS
            sameSite: 'None',    // important for cross-origin
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(201).json({
            message: "User successfully registered",
            data: savedUser
        });
    } catch (error) {
        res.status(400).json({
            message: "Something went wrong: " + error.message
        });
    }
};

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userdata = await user.findOne({ email });

        if (!userdata) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await userdata.validatepassword(password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = await userdata.getJWT();

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            message: "User logged in successfully",
            user: userdata
        });
    } catch (error) {
        res.status(400).json({
            message: "Something went wrong: " + error.message
        });
    }
};

const userLogout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        });
        res.status(200).json({
            message: "User logged out successfully"
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong: " + error.message });
    }
};

module.exports = { userRegister, userLogin, userLogout };
