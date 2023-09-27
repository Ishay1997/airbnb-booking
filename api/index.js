const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Place = require("./models/Place");
const User = require("./models/User");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");

require("dotenv").config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "fasefraw4r5r3wq45wdfgw34twdfg";

const corsOptions = {
  credentials: true,
  origin: "http://127.0.0.1:5173",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/uploads", express.static(__dirname + "/uploads"));

app.post("/login", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  // Destructure email and password from the request body
  const { email, password } = req.body;

  // Find a user with the provided email in the database
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    // If a user with the email exists, check if the password matches
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        (err, token) => {
          if (err) throw err;
          res.cookie("token", JSON.stringify(token));
          delete userDoc.password;
          res.json(userDoc);
        }
      );
      // If the password is valid, send a 'found' response
    } else {
      // If the password is incorrect, send an 'incorrect password' response
      res.status(422).json("password not ok");
    }
  } else {
    // If no user with the email is found, send a 'not found' response
    res.json("not found");
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
app.get("/profile", async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);
      res.json(name, email, _id);
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", async (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});

const photosMiddleware = multer({ dest: "uploads/" });
app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);

    uploadedFiles.push(newPath.replace("uploads\\", ""));
  }
  res.json(uploadedFiles);
});
app.post("/places", async (req, res) => {
  const {
    title,
    address,
    addedPhotos,
    description,
    price,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  } = req.body;
  // const { token } = req.cookies;

  // jwt.verify(token, jwtSecret, {}, async (err, userData) => {
  //   if (err) throw err;
  //   const placeDoc = await Place.create({
  //     owner: userData.id,
  //     price,
  //     title,
  //     address,
  //     photos: addedPhotos,
  //     description,
  //     perks,
  //     extraInfo,
  //     checkIn,
  //     checkOut,
  //     maxGuests,
  //   });
  //   res.json(placeDoc);
  // });
});

// app.post('/places',(req,res) => {
//   const {token} = req.cookies;
//   const {
//     title,address,addedPhotos,description,
//     perks,extraInfo,checkIn,checkOut,maxGuests
//   } = req.body;

//       jwt.verify(token,jwtSecret,{},async(err,userData)=>{
//           if(err) throw err;
// const placeDoc = await Place.create({
//   owner:userData.id,
//   title,address,addedPhotos,description,
//   perks,extraInfo,checkIn,checkOut,maxGuests
// });
// res.json(placeDoc);
// });
// });
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
