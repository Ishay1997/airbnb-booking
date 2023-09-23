const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");
const User = require("./models/User");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
app.use(cookieParser());
const port = process.env.PORT || 4000;

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret  = 'daskdfbkalsdsda';

app.use(express.json()); // Add this line to parse JSON request bodies
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  }));

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.post("/login", async (req, res) => {

    // Destructure email and password from the request body
    const { email, password } = req.body;
  
  
    // Find a user with the provided email in the database
    const userDoc = await User.findOne({ email });
  
    if (userDoc) {
      // If a user with the email exists, check if the password matches
      const passOk = bcrypt.compareSync(password, userDoc.password);
  
      if (passOk) {
        jwt.sign({email:userDoc.email,id:userDoc._id},jwtSecret, {},(err,token)=>{
            if(err) throw err;
            res.cookie('token',token).json(userDoc);        
        });
        // If the password is valid, send a 'found' response
      } else {
        // If the password is incorrect, send an 'incorrect password' response
        res.status(422).json('password not ok');
      }
    } else {
      // If no user with the email is found, send a 'not found' response
      res.json('not found');
    }
  });
  
  

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  console.log("Received request body:", req.body);
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });

    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});
app.get("/profile",  (req, res) => {
    const {token} = req.cookies;
    if (token){
        jwt.verify(token,jwtSecret,{},async(err,userData)=>{
            if(err) throw err;
            const {name,email,_id} = await User.findById(userData.id);
            res.json(name,email,_id);
        });
    }else{
        res.json(null);
    }
});

app.post('/logout',(req,res)=>{
   res.cookie('token','').json(true);
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
