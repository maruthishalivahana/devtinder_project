
const ConnectionRequestModel = require("../models/connectionRequest")
const { express, request } = require("express");
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

        const connectionRequest = await new ConnectionRequestModel({
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

const reciveConncetionRequest = async (req, res) => {
    try {

        const loginUser = req.User
        const { status, requestId } = req.params
        const allowedStatus = ["accepted", "reject"];
        if (!allowedStatus.includes(status)) {
            return res.status(401).json({
                message: "the status is not allowed "
            })
        }
        const Request = await ConnectionRequestModel.findOneAndUpdate({
            _id: requestId,
            toUserId: loginUser,
            status: "interested"
        }, { status }, { new: true })
        // Request.status = status
        // const data = await Request.save();

        if (!Request) {
            return res.status(401).json({
                message: "connection request not fond"
            })
        }

        return res.status(200).json({
            message: "request " + status + " sucessfully",
            Request
        })

    } catch (error) {

        return res.status(500).json({
            message: "somthing went wrong!" + error.message
        })
    }
}


module.exports = {
    sendConnectionRequest,
    reciveConncetionRequest
}
