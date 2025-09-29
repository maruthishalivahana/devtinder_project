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


const validateprofileEditData = (input) => {
    const data = input && input.body && typeof input.body === 'object' ? input.body : input;
    if (!data || typeof data !== 'object') return false;

    const allowedFields = ["firstName", "lastName", "age", "gender", "skills", "photourl", "about"];
    const isAllowed = Object.keys(data).every(field => allowedFields.includes(field));
    if (!isAllowed) return false;

    if ('firstName' in data) {
        if (typeof data.firstName !== 'string' || data.firstName.trim().length === 0) return false;
    }
    if ('lastName' in data) {
        if (typeof data.lastName !== 'string' || data.lastName.trim().length === 0) return false;
    }
    if ('age' in data) {

        const ageNum = Number(data.age);
        if (!Number.isFinite(ageNum) || !Number.isInteger(ageNum)) return false;
        if (ageNum < 13 || ageNum > 120) return false;
    }
    if ('skills' in data) {

        const skills = data.skills;
        if (Array.isArray(skills)) {
            if (!skills.every(s => typeof s === 'string')) return false;
        } else if (typeof skills === 'string') {

        } else {
            return false;
        }
    }
    if ('gender' in data) {
        if (typeof data.gender !== 'string') return false;
        const g = data.gender.trim().toLowerCase();
        const allowedGenders = ['male', 'female', 'other'];

        if (g.length === 0 || g.length > 40) return false;

    }
    if ('photourl' in data) {
        if (typeof data.photourl !== 'string' || !validator.isURL(data.photourl + '')) return false;
    }
    if ('about' in data) {
        if (typeof data.about !== 'string') return false;
        if (data.about.length > 1000) return false;
    }

    return true;
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