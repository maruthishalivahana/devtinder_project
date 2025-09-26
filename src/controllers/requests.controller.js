
const ConnectionRequestModel = require("../models/connectionRequest")
const { express } = require("express");
const { validate } = require("../models/user");
const { validateConnectionRequest } = require("../utils/validation");

const sendConnectionRequest = async (req, res) => {
    try {

        await validateConnectionRequest(req);
        const fromUserId = req.User._id;
        const { toUserId, status } = req.params;
        const allowedStatus = ["ignore", "interested"]
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                message: "status must be either ignored or interested"
            })
        }

        const connectionRequest = new ConnectionRequestModel({
            fromUserId,
            toUserId,
            status,
        });
        const data = await connectionRequest.save();
        return res.status(200).json({
            message: "Connection request sent successfully",
            data
        })

    } catch (error) {
        return res.status(500).json({
            message: "somthing went wrong!" + error
        })
    }
}


module.exports = {
    sendConnectionRequest
}
