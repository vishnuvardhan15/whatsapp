const express = require('express');
const { getAllChats, addChat, clearChat } = require('../controller/chatController');
const router = express.Router();

router.get('/', getAllChats);

router.post('/', addChat)

router.delete('/', clearChat)

module.exports = router;
