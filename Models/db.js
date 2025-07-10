const mongoose = require('mongoose');
const { connection_string } = require('../utils/const.js');
const mongo_uri = connection_string;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(mongo_uri);
    } catch (error) {
        process.exit(1);
    }
}

module.exports = connectDB