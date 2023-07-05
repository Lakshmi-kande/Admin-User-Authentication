const express = require('express');
const { registerAdmin, loginAdmin, getUsers, deleteUser } = require('../controllers/adminController');
const router = express.Router();
const validateToken = require('../middleware/auth');


router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/users', validateToken, getUsers);
router.delete('/users/:userId', validateToken, deleteUser);


module.exports = router;
