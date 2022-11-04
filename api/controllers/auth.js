const User = require("../models/user");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const user = await User.create({ ...req.body });
    console.log(user);
    const token = user.createJWT();
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Please provide email and password");
    }
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("No such user");
    }
    // compare password
    const isPasswordOk = await user.comparePassword(password);
    if (!isPasswordOk) {
      throw new Error("Invalid Credentials");
    }
    const token = user.createJWT();
    res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    res.status(401).json({ err });
  }
};

module.exports = {
  register,
  login,
};
