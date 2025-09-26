const mongoose = require('mongoose');
const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,

    },
    toUserId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
    },
    status: {
        type: String,
        enum: {
            values: ["interested", "ignore", "reject", "accepted"],
            message: "{VALUE} is not supported"
        }
    },
}, {
    timestamps: true

}
)
const index = connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true });

const ConnectionRequestModel = mongoose.model('ConnectionRequest', connectionRequestSchema);
module.exports = ConnectionRequestModel;