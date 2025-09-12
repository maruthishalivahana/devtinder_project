

const user = require("../models/user")
const userRegister = async (req, res) => {
    const { firstName, lastName, email, password, age, gender } = req.body;
    const newUser = new user({
        firstName,
        lastName,
        email,
        password,
        age,
        gender

    })
    await newUser.save();
    res.status(201).json({
        message: "user sucessfully registered"
    })
}


const userLoign = async (req, res) => {
    const { email, password } = req.body;
    const userdata = await user.findOne({ email, password });
    if (!userdata) {
        res.status(404).json({
            message: "user not found !"
        })
    }
    if (userdata.password !== password) {
        res.status(401).json({
            message: " invalid cridentials"
        })
    }
    res.status(200).json({
        message: "user login sucessfully"
    })
}

const getFeed = async (req, res) => {
    const feedData = await user.find();
    res.status(200).json(feedData)
}


const getuserbyemail = async (req, res) => {
    const email = req.body.email;
    const emaildB = await user.findOne({ email: email });
    if (emaildB) {
        res.status(200).json(emaildB)
    }
}

const getbyUser = async (req, res) => {
    const { id } = req.params;
    const dbId = await user.findById(id);
    if (dbId) {
        res.status(200).json(dbId)
    }
}


const deleteUser = async (req, res) => {

    const { id } = req.params;
    try {
        const userdata = await user.findByIdAndDelete(id);
        if (!userdata) {
            res.status(404).json({
                message: "user not fond!"
            })
        } else {
            res.status(200).json({
                message: `${id} user deleted`,
                user: userdata
            })
        }

    } catch (err) {
        res.status(400).json({
            message: "somting went wrong"
        })

    }

}

const updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        const updateduser = await user.findByIdAndUpdate(
            id,
            {
                $set: { email: "kummarivarshithkumar@gmail.com" }
            }, { new: true })
        if (!updateduser) {
            res.status(404).json({
                message: "user not found can not update the user details please try again"
            })
        } else {
            res.status(200).json({
                message: `${id} id updated sucessfully`,
                user: updateduser
            })
        }
        // await updateduser.save();

    } catch (err) {

    }

}
module.exports = {
    userRegister,
    userLoign,
    getFeed,
    getuserbyemail,
    getbyUser,
    deleteUser,
    updateUser
}