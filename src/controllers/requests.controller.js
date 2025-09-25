
const User = require("../models/user")

const sendConnectionRequest = async (req, res) => {
    try {
        const { reciverid } = req.params;
        const sender = req.User;
        if (!sender) {
            return res.status(401).json({
                message: " sender user not found"
            })
        }
        const reciver = await User.findById(reciverid);
        if (!reciver) {
            return res.status(404).json({
                message: "reciver user not found"
            })
        }
        if (reciverid === String(sender._id)) {
            return res.status(400).json({
                message: "you cannot send connection request to yourself"
            })
        }
        if (reciver.connectionRequests.includes(sender._id)) {
            return res.status(400).json({
                message: "connection request already sent"
            })
        }
        reciver.connectionRequests.push(sender._id);
        await reciver.save();

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
    sendConnectionRequest
}
