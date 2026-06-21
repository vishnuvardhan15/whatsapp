const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const messageSchema = new Schema(
{
    chatId: {
        type: Schema.Types.ObjectId,
        ref: "Chat",
        required: true
    },

    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    text: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

module.exports = model("Message", messageSchema);