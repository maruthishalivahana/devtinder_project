const mongoose = require('mongoose');
require("dotenv").config();

const connectDB = async () => {

    await mongoose.connect(process.env.DATABASE_URL);
    //|| "mongodb://localhost:27017/DevTinder"
}


module.exports = connectDB;