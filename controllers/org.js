const orgModel = require("../models/organisation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "errorless.nits@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});

const emailRe =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const passwordRe = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,100}$/;

const instiDetails = async (req, res) => {
  const orgId = req.params.id;

  const org = await orgModel.findById(orgId);

  res.status(200).json({
    org,
  });
};

const getAllInsti = async (req, res) => {
  const organisations = await orgModel.find();
  const data = organisations.map((o) => ({
    organisation: o.name,
    orgId: o._id,
  }));
  res.json(data);
};

const signup = async (req, res) => {
  const { name, email, description, img, password, confirmPassword } = req.body;
  try {
    const alreadyOrg = await orgModel.findOne({ email });
    if (alreadyOrg) {
      return res.json({
        success: false,
        message: "The Organisation already exists. Please signin",
      });
    } else if (!passwordRe.test(password)) {
      return res.json({
        success: false,
        message: "Enter valid password",
      });
    } else if (!emailRe.test(email)) {
      return res.json({
        success: false,
        message: "Enter valid email",
      });
    } else if (password !== confirmPassword) {
      return res.json({
        success: false,
        message: "Password and Confirm Password doesn't match",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newOrg = await new orgModel({
      name,
      email,
      description,
      img,
      password: hashedPassword,
    });
    const org = await newOrg.save();
    const token = jwt.sign(
      {
        email: org.email,
        id: org._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );

    await transporter.sendMail(
      {
        from: '"CoLive-21" <errorless.nits@gmail.com>',
        to: `${org.email}`,
        subject: "Organisation Registered | CoLive-21",
        text: `Organisation ${org.name} Registered`,
      },
      (error) => {
        console.log(error);
      }
    );
    res.json({ success: true, org, token });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Internal Server error. Please try again",
    });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!emailRe.test(email)) {
      return res.json({ success: false, message: "Enter valid email" });
    }
    const org = await orgModel.findOne({ email });
    if (!org) {
      return res.json({
        success: false,
        message: "Email id or password doesn't match",
      });
    }
    const validPassword = await bcrypt.compare(password, org.password);
    if (!validPassword) {
      return res.json({
        success: false,
        message: "Email id or password doesn't match",
      });
    }

    const token = jwt.sign(
      {
        email: org.email,
        id: org._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );
    res.json({ success: true, org, token });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Internal Server error, Please try again",
    });
  }
};

const editDetails = async (req, res) => {
  const {
    name,
    email,
    password,
    prevPassword,
    confirmPassword,
    img,
    description,
    status,
    _id,
  } = req.body;
  const { orgId } = req.params;

  if (_id !== orgId) {
    return res.json({
      success: false,
      message: "You don't have permission to change the details",
    });
  }
  try {
    const foundOrg = await orgModel.findById(orgId);
    if (!foundOrg) {
      return res.json({
        success: false,
        message: "You don't have permission to change the details",
      });
    }
    const orgWithEmail = await orgModel.findOne({ email });
    if (!orgWithEmail.password === foundOrg.password) {
      return res.json({
        success: false,
        message: "Entered email id exists in our database",
      });
    } else if (prevPassword) {
      const validPassword = await bcrypt.compare(
        prevPassword,
        foundOrg.password
      );
      if (!validPassword) {
        return res.json({
          success: false,
          message: "You have entered wrong current password",
        });
      } else {
        if (password !== confirmPassword) {
          return res.json({
            success: false,
            message: "Password and Confirm password doesn't match",
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
          const updatedOrg = await orgModel.findByIdAndUpdate(
            orgId,
            {
              name,
              email,
              password: hashedPassword,
              img,
              description,
              status,
            },
            { new: true }
          );
          const org = await updatedOrg.save();
          res.json({ success: true, org });
        }
      }
    } else {
      const updatedOrg = await orgModel.findByIdAndUpdate(
        orgId,
        {
          name,
          email,
          img,
          description,
          status,
        },
        { new: true }
      );
      const org = await updatedOrg.save();
      res.json({ success: true, org });
    }
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Internal Server error, Please try again",
    });
  }
};

module.exports = {
  instiDetails,
  getAllInsti,
  signin,
  signup,
  editDetails,
};
