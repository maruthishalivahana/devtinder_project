
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



module.exports = {
    profile,

}