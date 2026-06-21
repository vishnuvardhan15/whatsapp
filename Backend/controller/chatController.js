const Message = require("../model/message");
const Chat = require("../model/chat");
const User = require("../model/user");

/*
=========================================
GET ALL CHATS OF CURRENT USER
=========================================
*/
const getContacts = async (req, res) => {
    try {

        const user = await User.findById(req.user.id)
            .populate("contacts", "name email");

        res.status(200).json(user.contacts);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};

/*
=========================================
ADD CONTACT
=========================================
*/
const addContact = async (req, res) => {

    try {
        // console.log(req.body);
        const myId = req.user.id;
        // console.log(myId);
        const { email } = req.body;

        const contactUser = await User.findOne({ email });

        if (!contactUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (contactUser._id.toString() === myId) {
            return res.status(400).json({
                message: "You cannot add yourself"
            });
        }                   

        const me = await User.findById(myId);

        const alreadyAdded = me.contacts.some(
            id => id.toString() === contactUser._id.toString()
        );

        if (alreadyAdded) {
            return res.status(400).json({
                message: "Contact already exists"
            });
        }

        // Add contact mutually
        me.contacts.push(contactUser._id);
        contactUser.contacts.push(myId);

        await me.save();
        await contactUser.save();

        // Create chat room
        const chat = await Chat.create({
            myId,
            contactId: contactUser._id,
            messages: []
        });

        res.status(201).json({
            success: true,
            message: "Contact added successfully",
            chat
        });

    } catch (err) {
        // console.log(err);
        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

/*
=========================================
GET OR CREATE CHAT + MESSAGES
=========================================
*/
const getChat = async (req, res) => {

    try {

        const myId = req.user.id;
        const { contactId } = req.params;
        console.log("cerds : " + myId, contactId);

        let chat = await Chat.findOne({
            $or: [
                {
                    myId,
                    contactId
                },
                {
                    myId: contactId,
                    contactId: myId
                }
            ]
        }).populate({
            path: "messages",
            options: {
                sort: {
                    createdAt: 1
                }
            }
        });

        /*
        Create chat if not exists
        */
        if (!chat) {

            chat = await Chat.create({
                myId,
                contactId,
                messages: []
            });

            chat = await Chat.findById(chat._id)
                .populate({
                    path: "messages",
                    options: {
                        sort: {
                            createdAt: 1
                        }
                    }
                });
        }
        // console.log(chat.messages);
        res.status(200).json({
            chatId: chat._id,
            myId: chat.myId,
            contactId: chat.contactId,
            messages: chat.messages
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

/*
=========================================
SEND MESSAGE
=========================================
*/
const addMessage = async (req, res) => {

    try {

        const { chatId, text } = req.body;

        const chat = await Chat.findById(chatId);

        if (!chat) {
            return res.status(404).json({
                message: "Chat not found"
            });
        }

        const message = await Message.create({
            chatId,
            senderId: req.user.id,
            text
        });

        chat.messages.push(message._id);

        await chat.save();

        const io = req.app.get("io");

        io.to(chatId).emit("receive-message", 
            message
        );

        res.status(201).json({
            success: true,
            message
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

/*
=========================================
DELETE ALL MESSAGES
=========================================
*/
const clearMessages = async (req, res) => {

    try {

        await Message.deleteMany({});
        await Chat.updateMany(
            {},
            {
                $set: {
                    messages: []
                }
            }
        );

        res.status(200).json({
            message: "All messages deleted"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

module.exports = {
    getContacts,
    addContact,
    getChat,
    addMessage,
    clearMessages
};