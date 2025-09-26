const User = require("../models/user")
const { validateprofileEditData } = require("../utils/validation")
const bcrypt = require("bcrypt")
const profileEdit = async (req, res) => {
    if (!validateprofileEditData(req)) {
        return res.status(400).json({
            message: "invalid data"
        })
    }


    try {

        const { firstName, lastName, age, skills, gender, photourl } = req.body;
        const users = req.User;
        if (!users) {
            return res.status(401).json({
                message: "user not found"
            })
        }
        const updatedUser = await User.findByIdAndUpdate(users._id, {
            firstName,
            lastName,
            age,
            skills,
            gender,
            photourl
        }, { new: true })
        updatedUser.save();
        res.status(200).json({
            message: "profile updated sucessfully",
            user: updatedUser
        })

    } catch (error) {
        res.status(500).json({
            message: "somthing went wrong!" + error
        })

    }
}


const editPassword = async (req, res) => {
    try {
        const { oldpassword, newpassword } = req.body;
        const user = req.User;
        if (!user) {
            return res.status(401).json({
                message: "user not found"
            })
        }

        const ispasswordValid = await user.validatepassword(oldpassword)
        if (!ispasswordValid) {
            return res.status(401).json({
                message: "old password is incorrect"
            })
        }
        const hashedpassword = await bcrypt.hash(newpassword, 10);
        user.password = hashedpassword
        await user.save();
        res.status(200).json({
            message: "password updated sucessfully",
            updatedUser: user
        })
    } catch (error) {
        res.status(500).json({
            message: "somthing went wrong!" + error
        })
    }
}
module.exports = {
    profileEdit,
    editPassword
}