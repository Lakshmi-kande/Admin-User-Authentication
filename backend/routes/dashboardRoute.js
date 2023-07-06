const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const { constants } = require('../constants');

router.get('/dashboard/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(constants.SUCCESSFULL_REQUEST).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(constants.SERVER_ERROR).json({ error: 'Failed to fetch users' });
  }
});

router.delete('/dashboard/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);
    res.status(constants.SUCCESSFULL_REQUEST).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(constants.SERVER_ERROR).json({ error: 'Failed to delete user' });
  }
});
  
module.exports = router;
