const express = require('express');
const { registerUser, loginUser, updateUserProfile } = require('../controllers/userController');
const router = express.Router();

// const { validateToken } = require('../middleware/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/profile', updateUserProfile);
module.exports = router;
