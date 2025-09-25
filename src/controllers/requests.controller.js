const sendConnectionRequest = async (req, res) => {
    try {
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
