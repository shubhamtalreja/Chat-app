const { text } = require('express');
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
        trim: true
    },
    text: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true,
        trim: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }

});

const Messages = mongoose.model('Messages',messageSchema);

module.exports = Messages;