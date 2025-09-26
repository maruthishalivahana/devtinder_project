const validator = require("validator");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");
const validateSignupData = (req) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName) {
        throw new Error("name is not valid")

    }
    else if (validator.isEmail(email)) {
        throw new Error("email is not valid")
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("password must be strong")
    }
}


const validateprofileEditData = (req) => {
    const allowedFields = ["firstName", "lastName", "age", "gender", "skills", "photourl"];
    const isAllowed = Object.keys(req.body).every(field => allowedFields.includes(field));
    if (!isAllowed) {
        throw new Error("Invalid fields in profile edit request");

    }

}

const validateConnectionRequest = async (req) => {
    const fromUserId = req.User._id;
    const { toUserId, status } = req.params;
    if (!toUserId || !status) {
        throw new Error("toUserId and status are required")
    }
    if (fromUserId.toString() === toUserId) {
        throw new Error("you cannot send request to yourself")
    }
    // Check if a request already exists between the two users
    const existingRequest = await ConnectionRequestModel.findOne({
        $or: [
            {
                fromUserId,
                toUserId
            },
            {
                fromUserId: toUserId,
                toUserId: fromUserId
            }
        ]
    });

    const findUserIdDb = await User.findById(toUserId);
    if (!findUserIdDb) {
        throw new Error("The user you are trying to connect with does not exist");
    }

    if (existingRequest) {
        throw new Error("A connection request already exists between these users");

    }
}

module.exports = {
    validateSignupData,
    validateprofileEditData,
    validateConnectionRequest
}