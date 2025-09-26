

const ConnectionRequestModel = require('../models/connectionRequest')



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

        }).populate("fromUserId", "firstName lastName")
            .populate("toUserId", "firstName lastName")

        const data = conncetions.map((conn) => {

            if (conn.fromUserId._id.toString() === loginUser._id.toString()) {
                return conn.toUserId;

            }
            return conn.fromUserId
        })
        res.status(200).json({
            message: "your conncetions!",
            // conncetions,
            data
        })

    } catch (error) {
        res.status(500).json({
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
        res.status(200).json({
            messasge: "conncetion data",
            connectionsRequests

        })
    } catch (error) {
        res.status(500).json({
            messasge: "something went worng" + error.message
        })
    }
}


module.exports = {
    getConncetionsRequests,
    getConncetions

}
