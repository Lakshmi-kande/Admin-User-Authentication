const Admin = require('../models/adminModel');
const User = require('../models/userModel'); 
const bcrypt = require('bcrypt');
const { constants } = require('../constants');
const jwt = require('jsonwebtoken');
const validateToken = require('../middleware/auth');

const registerAdmin = async (req, res) => {
  const { name, email, password, mobile, role } = req.body;

  if (!name || !email || !password || !mobile || !role) {
    return res
      .status(constants.VALIDATION_ERROR)
      .json({ message: 'All fields are mandatory' });
  }

  const adminAvailable = await Admin.findOne({ email });
  if (adminAvailable) {
    return res
      .status(constants.VALIDATION_ERROR)
      .json({ message: 'You are already registered' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newAdmin = await Admin.create({
    name,
    email,
    password: hashedPassword,
    mobile
  });

  res.status(constants.SUCCESSFULL_POST).json(newAdmin);
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(constants.VALIDATION_ERROR).json({ message: 'Email and password are required' });
  }

  const admin = await Admin.findOne({ email });
  if (admin && (await bcrypt.compare(password, admin.password))) {
    const accessToken = jwt.sign({
      admin: {
        name: admin.name,
        email: admin.email,
        id: admin.id,
      },
    }, process.env.JWT_SECRET_TOKEN, { expiresIn: process.env.JWT_EXPIRES_IN });

    res.status(constants.SUCCESSFULL_REQUEST).json({
      message: 'Login successful',
      accessToken,
    });
  } else {
    res.status(constants.UNAUTHORIZED).json({ error: 'Email or password is not valid' });
  }
};

const getUsers = async (req, res) => {
  validateToken(req, res, async () => {
    const users = await User.find();
    res.status(constants.SUCCESSFULL_REQUEST).json(users);
  });
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  validateToken(req, res, async () => {
    await User.findByIdAndDelete(userId);
    res.status(constants.SUCCESSFULL_REQUEST).json({ message: 'User deleted successfully' });
  });
};

module.exports = { registerAdmin, loginAdmin, getUsers, deleteUser };