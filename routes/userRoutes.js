const { hashGenerate, hashValidator } = require("../bcrypt/hashing.js");

const User = require("../model/userSchema");
const authRoutes = require("express").Router();

authRoutes.post("/signup", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser === null || !existingUser) {
      const hashPass = await hashGenerate(req.body.password);

      const newUser = await User.create({
        email: req.body.email,
        password: hashPass,
      });
      console.log(newUser);
      res.json({
        status: "success",
        message: "Registration succesful",
        newUser,
      });
    } else {
      res.status(400).json({
        status: "Failed",
        message: "Email already Exist",
      });
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
authRoutes.post("/login", async (req, res) => {
  try {
    console.log();
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser === null || !existingUser) {
      res.status(400).json({
        status: "Failed",
        message: "User Not Found, Kindly signup ",
      });
    } else {
      let passCheck = await hashValidator(
        req.body.password,
        existingUser.password
      );
      if (passCheck) {
        res.status(200).json({
          status: "Success",

          email: existingUser.email,
        });
      } else {
        res.status(400).json({
          status: "Failed",
          message: "Check your credentials",
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Check your credentials",
    });
  }
});
module.exports = authRoutes;
