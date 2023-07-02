const Admin = require('../models/adminModel');
const User = require('../models/userModel'); 
const bcrypt = require('bcrypt');
const { constants } = require('../constants');
const jwt = require("jsonwebtoken");

const registerAdmin = async (req, res) => {
  const { name, email, password, mobile } = req.body;

  try {
    if (!name || !email || !password || !mobile) {
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
  } catch (error) {
    console.error(error);
    res.status(constants.SERVER_ERROR).json({ error: 'Server error' });
  }
};

const loginAdmin = async (req,res)=>{
    const { email, password } = req.body;
    if(!email || !password){
        throw new Error(constants.VALIDATION_ERROR);
    }
    const admin = await Admin.findOne({email});
    if (admin && (await bcrypt.compare (password, admin.password))){
        const accessToken = jwt.sign({
            admin:{
                name: admin.name,
                email:admin.email,
                id:admin.id,
            },
        },process.env.JWT_SECRET_TOKEN,{ expiresIn: process.env.JWT_EXPIRES_IN});
        res.status(constants.SUCCESSFULL_REQUEST).json({
          message: 'Login successful',
          accessToken,
        });
    }else{
        res.status(constants.UNAUTHORIZED);
        throw new Error("email or password is not valid");
    }
};


const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(constants.SUCCESSFULL_REQUEST).json(users);
  } catch (error) {
    console.error(error);
    res.status(constants.SERVER_ERROR).json({ error: 'Server error' });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    await User.findByIdAndDelete(userId);
    res.status(constants.SUCCESSFULL_REQUEST).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(constants.SERVER_ERROR).json({ error: 'Server error' });
  }
};

module.exports = { registerAdmin, loginAdmin, getUsers, deleteUser };