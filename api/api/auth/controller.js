const jwt = require("jsonwebtoken");
const {
  validatePassword,
  signJwt,
  createUser,
  getUserByEmail,
  getUserByToken,
} = require("./service");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDoc = await getUserByEmail(email);
    if (!userDoc) res.json("User not found");

    const isPasswordValid = await validatePassword(password, userDoc.password);
    if (!isPasswordValid) res.json("Password not valid");

    const token = await signJwt(userDoc);
    res.cookie("token", token).json(userDoc);
  } catch (err) {
    res.status(401).send(err);
  }
};

exports.loginWithToken = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.json(null);

    const userData = await getUserByToken(token);
    const user = await getUserByEmail(userData?.email);
    res.json(user);
  } catch (err) {
    res.status(401).send(err);
  }
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userDoc = await createUser(name, email, password);
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
};

exports.logout = async (req, res) => {
  res.cookie("token", "").json(true);
};
