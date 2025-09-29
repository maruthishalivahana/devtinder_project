

const ConnectionRequestModel = require('../models/connectionRequest')

const User = require('../models/user')

const getConncetions = async (req, res) => {
    try {
        const loginUser = req.User;



        const conncetions = await ConnectionRequestModel.find({
            $or: [
                {
                    toUserId: loginUser, status: "accepted"
                },
                { fromUserId: loginUser, status: "accepted" }
            ]

        }).populate("fromUserId", "firstName lastName about photourl age gender skills")
            .populate("toUserId", "firstName lastName about photourl age gender skills")

        const data = conncetions.map((conn) => {

            if (conn.fromUserId._id.toString() === loginUser._id.toString()) {
                return conn.toUserId;

            }
            return conn.fromUserId
        })
        return res.status(200).json({
            message: "your conncetions!",
            // conncetions,
            data
        })

    } catch (error) {
        return res.status(500).json({
            messasge: "something went worng" + error.message
        })
    }
}
const getConncetionsRequests = async (req, res) => {
    try {
        const loginUser = req.User
        const connectionsRequests = await ConnectionRequestModel.find({
            toUserId: loginUser,
            status: "interested"
        }).populate("fromUserId", "firstName lastName gender age skills photourl");
        return res.status(200).json({
            messasge: "conncetion data",
            connectionsRequests

        })
    } catch (error) {
        res.status(500).json({
            messasge: "something went worng" + error.message
        })
    }
}


const getFeed = async (req, res) => {
    try {
        const loginUser = req.User;
        const page = parseInt(req.query.page) || 1
        let limit = parseInt(req.query.limit) || 10
        limit = limit > 50 ? 50 : limit

        const skip = (page - 1) * limit

        const conncetionRequests = await ConnectionRequestModel.find({
            $or: [
                {
                    fromUserId: loginUser._id,
                },
                {
                    toUserId: loginUser._id,
                }

            ]
        }).select("fromUserId toUserId")

        const hidefeed = new Set();

        conncetionRequests.forEach((req) => {
            hidefeed.add(req.fromUserId.toString())
            hidefeed.add(req.toUserId.toString())
        })

        const feed = await User.find({
            $and: [
                { _id: { $nin: Array.from(hidefeed) } },
                { _id: { $ne: loginUser._id } }
            ]

        }).select("firstName lastName age gender skills photourl").skip(skip).limit(limit)

        return res.status(200).json({
            message: "your feed",
            feed
        })

    } catch (error) {

    }
}


module.exports = {
    getConncetionsRequests,
    getConncetions,
    getFeed

}
