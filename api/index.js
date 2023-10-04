const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
const corsOptions = {
  credentials: true,
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"]
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const authRoutes = require("./api/auth/routes");
const imagesRoutes = require("./api/images/routes");
const placesRoutes = require("./api/places/routes");
const uploadRoutes = express.static(__dirname + "/uploads");

app.use("/uploads", uploadRoutes);
app.use("/auth", authRoutes);
app.use("/images", imagesRoutes);
app.use("/places", placesRoutes);

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

const ipAddress = '127.0.0.1'

app.listen(port, ipAddress, () => {
  console.log(`API server is running on ${ipAddress}:${port}`);
});

module.exports = app;