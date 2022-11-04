const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { Error } = require("mongoose");

const auth = async (req, res, next) => {
  // check header
  try{
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("Authentication invalid");
    }
    const token = authHeader.split(" ")[1];
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      // attach the user to the habit routes
      req.user = {
        userId: payload.userId,
        name: payload.name,
        email: payload.email,
      };
      next();
    } catch (error) {
      console.log(Error);
      throw new Error("Authentication invalid");
    }
  } catch(err){
    res.status(498).send('Token is not valid or expired')
  }
  
};

module.exports = auth;
