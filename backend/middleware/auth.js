const jwt = require("jsonwebtoken");
const { constants } = require("../constants");

const validateToken = async(req,res, next)=>{
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err, decoded) =>{
            if (err){
                res.status (constants.UNAUTHORIZED);
                return res.json({ error: "User is not authorized" });
            }
            req.user = decoded.user;
            next();
        });
        if (!token){
            res.status(constants.UNAUTHORIZED);
            return res.json({ error: "User is not authorized or token is missing" });
        }
    }
};

module.exports = validateToken;














// const jwt = require('jsonwebtoken');
// const { constants } = require('../constants');

// // Generate a JWT token
// const generateToken = (adminId) => {
//   const token = jwt.sign({ adminId }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN,
//   });
//   return token;
// };

// // Middleware to protect routes
// const protect = async (req, res, next) => {
//   try {
//     // Check if the token exists in the request headers
//     const token = req.headers.authorization?.split(' ')[1];

//     if (!token) {
//       return res.status(constants.UNAUTHORIZED).json({ error: 'Not authorized' });
//     }

//     // Verify the token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Attach the decoded payload to the request object
//     req.adminId = decoded.adminId;

//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(constants.UNAUTHORIZED).json({ error: 'Not authorized' });
//   }
// };

// module.exports = { generateToken, protect };
