const mongoose = require('mongoose');
var validator = require('validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const userschema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50

    }, lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: function (v) {
                return validator.isEmail(v);
            },
            message: "Invalid email"
        }

    }, password: {
        type: String,
        required: true,


    }, age: {
        type: Number,


    }, gender: {
        type: String,
        enum: {
            values: ["Male", "Female", "Others"],
            message: "{VALUE} is not supported"
        },

        // validate: {
        //     validator: function (v) {
        //         return v === "male" || v === "female";
        //     },
        //     message: "Gender must be either male or female"
        // }
    },
    skills: {
        type: [String],


    },
    photourl: {
        type: String,
        default: "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
        validate(v) {
            if (!validator.isURL(v)) {
                throw new Error("Invalid URL")
            }
        }
    }, about: {
        type: String,
    }

},
    {
        timestamps: true
    })

const JSON_WEB_TOKEN = process.env.JSON_WEB_TOKEN

userschema.methods.getJWT = async function () {
    const token = await jwt.sign({
        id: this._id
    }, JSON_WEB_TOKEN, { expiresIn: '1d' });
    return token;
}


userschema.methods.validatepassword = async function (password) {
    const ispasswordValid = await bcrypt.compare(password, this.password)
    return ispasswordValid;
}
const User = mongoose.model("User", userschema);

module.exports = User;


