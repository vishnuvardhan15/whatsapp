const { Schema, model } = require("mongoose");

const chatSchema = new Schema(
{
    myId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    contactId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    messages: [{
        type: Schema.Types.ObjectId,
        ref: "Message"
    }]
},
{
    timestamps: true
});

module.exports = model("Chat", chatSchema);