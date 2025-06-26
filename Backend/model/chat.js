const mongoose = require("mongoose")
const {model, Schema} = mongoose;

const chatSchema = new Schema({
    owner: {
        type: String,
    },
    text: {
        type: String,
    }
})

const Chat = model('whatsapp-chat', chatSchema);
module.exports = Chat;