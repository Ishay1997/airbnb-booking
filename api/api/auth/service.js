const mongoose = require("mongoose");
const User = require("../../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.createUser = async (name, email, password) => {
  return await User.create({
    name,
    email,
    password: bcrypt.hashSync(password, bcryptSalt),
  });
};

exports.getUserByEmail = async (email) => {
  mongoose.connect(process.env.MONGO_URL);
  const user = await User.findOne({ email });
  return user;
};

exports.getUserByToken = async (token) => {
  return jwt.verify(
    token,
    process.env.JWT_SECRET,
    {},
    async (err, userData) => {
      if (err) throw err;
      return userData
    }
  );
};

exports.validatePassword = async (currPassword, originPassword) => {
  return bcrypt.compareSync(currPassword, originPassword);
};

exports.signJwt = async (userDoc) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { email: userDoc.email, id: userDoc._id },
      process.env.JWT_SECRET,
      async (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
};
