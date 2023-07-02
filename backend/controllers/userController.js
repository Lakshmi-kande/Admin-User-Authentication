const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const { constants } = require('../constants');
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { name, address, profilePic, mobile, email, password } = req.body;

  try {
    if (!name || !address || !profilePic || !mobile || !email || !password) {
      return res
        .status(constants.VALIDATION_ERROR)
        .json({ message: 'All fields are mandatory' });
    }

    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      return res
        .status(constants.VALIDATION_ERROR)
        .json({ message: 'Email already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      address,
      profilePic,
      mobile,
      email,
      password: hashedPassword
    });

    res.status(constants.SUCCESSFULL_POST).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(constants.SERVER_ERROR).json({ error: 'Server error' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(constants.VALIDATION_ERROR).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(constants.VALIDATION_ERROR).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(constants.VALIDATION_ERROR).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_TOKEN, { expiresIn: process.env.JWT_EXPIRES_IN });

    res.status(constants.SUCCESSFULL_POST).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(constants.SERVER_ERROR).json({ error: 'Server error' });
  }
};

const updateUserProfile = async (req, res) => {
  const { name, address, profilePic, mobile } = req.body;
  const userId = req.userId; 

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(constants.VALIDATION_ERROR).json({ message: 'User not found' });
    }

    user.name = name || user.name;
    user.address = address || user.address;
    user.profilePic = profilePic || user.profilePic;
    user.mobile = mobile || user.mobile;

    const updatedUser = await user.save();

    res.status(constants.SUCCESSFULL_POST).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(constants.SERVER_ERROR).json({ error: 'Server error' });
  }
};

module.exports = { registerUser, loginUser, updateUserProfile };
