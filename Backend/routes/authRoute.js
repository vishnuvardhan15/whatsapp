const express = require('express');
const router = express.Router();

const {
    signup,
    login,
    forgotPassword,
    resetPassword,
    logout,
    getAllUsers
} = require('../controller/authController');
router.get('/', getAllUsers);
router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/logout', logout);

module.exports = router;