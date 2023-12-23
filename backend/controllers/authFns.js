const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const handleRegister = async (req, res, next) => {
  try {
    const { name, email, password, mobile } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(409).json({ status: "ERROR", message: "user already exists" });
      return;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: encryptedPassword,
      mobile,
    });

    await newUser.save();

    const token = jwt.sign(newUser.toJSON(), process.env.JWT_KEY, {
      expiresIn: "10d",
    });

    res
      .status(201)
      .json({
        status: "SUCCESS",
        token,
        recruiterName: newUser.name,
        message: "Registered user successfully!",
      });
  } catch (e) {
    console.error("Error during registration:", e.response?.data || e.message);
    console.log("Full response:", e.response);
    next(e);
  }
};

const handleLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ status: "FAILED", message: "User does not exist" });
    }

    const passwordBool = await bcrypt.compare(password, user.password);
    if (!passwordBool) {
      return res
        .status(401)
        .json({
          status: "FAILED",
          token,
          recruiterName: user.name,
          message: "incorrect Password",
        });
    }
    const token = jwt.sign(user.toJSON(), process.env.JWT_KEY, {
      expiresIn: "10d",
    });
    res.status(200).json({
      status: "SUCCESS",
      message: "Logged In!",
      token,
      recruiterName: user.name,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = { handleRegister, handleLogin };
