const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'Username must be unique']
    },
    password: { type: String, required: [true, 'password is required'] },

    history: { type: Array, default: () => Array(50).fill(-1) },
    ptr: { type: Number, default: 0 }

}, { collection: 'WebScraper', timestamps: true }); //autocreates a collection named 'WebScraper'

const User = mongoose.model('User', userSchema);// this registers model named 'User'
module.exports = User