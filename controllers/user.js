const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Org = require("../models/organisation");

const emailRe =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const passwordRe = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

module.exports.getDetails = async (req, res) => {
  const { userId } = req.params;
  try {
    const foundUser = await User.findById(userId);
    if (!foundUser) {
      return res.json({ success: false, message: "The user doesn't exist" });
    } else {
      return res.json({ success: true, user: foundUser });
    }
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err });
  }
};

module.exports.signup = async (req, res) => {
  const {
    name,
    email,
    password,
    confirmPassword,
    organisation,
    phoneNo,
    photo,
  } = req.body;
  try {
    const alreadyUser = await User.findOne({ email });
    if (!emailRe.test(email)) {
      return res.json({
        success: false,
        message: "Enter valid email",
      });
    }
    if (alreadyUser)
      return res.json({
        success: false,
        message: "The user already exists. Please signin",
      });
    if (password !== confirmPassword)
      return res.json({
        success: false,
        message: "Password and Confirm Password doesn't match",
      });
    if (!passwordRe.test(password))
      return res.json({
        success: false,
        message:
          "Password must contain atleast 8 character, one special character and one number",
      });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await new User({
      name,
      email,
      password: hashedPassword,
      organisation,
      photo,
      phoneNo,
    });
    const user = await newUser.save();

    const org = await Org.findById(organisation.orgId);
    org.crew.push(user._id);
    org.markModified("crew");
    org.status[0] = org.status[0] + 1;
    org.markModified("status");
    await org.save();

    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );
    res.json({ success: true, user, token });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Internal Server error. Please try again",
    });
  }
};

module.exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!emailRe.test(email))
      return res.json({ success: false, message: "Enter valid email" });
    const user = await User.findOne({ email });
    if (!user)
      return res.json({
        success: false,
        message: "Email id or password doesn't match",
      });
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.json({
        success: false,
        message: "Email id or password doesn't match",
      });

    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "24h",
      }
    );
    res.json({ success: true, user, token });
  } catch (error) {
    res.json({
      success: false,
      message: "Internal server error. Please try again",
    });
  }
};

module.exports.editDetails = async (req, res) => {
  const {
    name,
    photo,
    prevPassword,
    password,
    confirmPassword,
    phoneNo,
    history,
    vaccinationStatus,
    status,
    _id,
    email,
  } = req.body;

  const { userId } = req.params;
  if (_id !== userId) {
    return res.json({
      success: false,
      message: "You don't have the permission to change details",
    });
  }
  try {
    const foundUser = await User.findById(userId);
    if (!foundUser) {
      res.json({
        success: "False",
        message: "You don't have the permission to change details",
      });
    }
    const userWithEmail = await User.findOne({ email });
    if (!userWithEmail.password === foundUser.password) {
      return res.json({
        success: false,
        message: "Email id exist in our database.",
      });
    }
    if (prevPassword) {
      const validPassword = await bcrypt.compare(
        prevPassword,
        foundUser.password
      );
      if (!validPassword) {
        return res.json({
          success: false,
          message: "You have entered wrong prev password",
        });
      } else {
        if (password !== confirmPassword) {
          return res.json({
            success: false,
            message: "Password and Confirm Password don't match",
          });
        } else if (!passwordRe.test(password)) {
          return res.json({
            success: false,
            message:
              "Password must contain atleast 8 character, one special character and one number",
          });
        } else {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
              name,
              photo,
              password: hashedPassword,
              phoneNo,
              vaccinationStatus,
              status,
              history,
              email,
            },
            { new: true }
          );
          const user = await updatedUser.save();
          res.json({ success: true, user });
        }
      }
    } else {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          name,
          photo,
          phoneNo,
          vaccinationStatus,
          status,
          history,
          email,
        },
        { new: true }
      );
      const user = await updatedUser.save();
      res.json({ success: true, user });
    }
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Internal server error" });
  }
};

module.exports.users = async (req, res) => {
  const users = await User.find();
  res.json({
    users,
  });
};
