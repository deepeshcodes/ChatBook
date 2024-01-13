const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    from : {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    message:{
        type: String,
        maxlength: 50,
    },
    date: {
        type: Date,
        required: true,
    },
    updated_at: {
        type: Date,
    }
})

const Chat = mongoose.model("Chat",chatSchema);

module.exports = Chat;