const validator = require("validator");


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

module.exports = {
    validateSignupData
}