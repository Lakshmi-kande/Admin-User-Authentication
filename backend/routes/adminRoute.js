const express = require('express');
const { registerAdmin, loginAdmin, getUsers, deleteUser } = require('../controllers/adminController');
const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/users', getUsers);
router.delete('/users/:userId', deleteUser);


module.exports = router;
