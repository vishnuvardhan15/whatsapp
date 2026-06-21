const express = require('express');

const {
    getContacts,
    addContact,
    getChat,
    addMessage,
    clearMessages
} = require('../controller/chatController');

const authorize = require('../middleware/auth');

const router = express.Router();

/*
=========================================
CONTACTS
=========================================
*/

// Add contact
router.post(
    '/contact/add',
    authorize,
    addContact
);

// Get all contacts of logged in user
router.get(
    '/contacts',
    authorize,
    getContacts
);

/*
=========================================
CHATS
=========================================
*/

// Get chat by contact id
router.get(
    '/chat/:contactId',
    authorize,
    getChat
);

/*
=========================================
MESSAGES
=========================================
*/

// Send message
router.post(
    '/message/send',
    authorize,
    addMessage
);

// Delete all messages (development/testing)
router.delete(
    '/messages',
    authorize,
    clearMessages
);

module.exports = router;