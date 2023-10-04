const fs = require('fs');
const path = require('path');
const imageDownloader = require("image-downloader");
const jwt = require("jsonwebtoken");

exports.uploadFile = (file) => {
    const { path, originalname } = file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    return newPath.replace("uploads\\", "");
};

exports.downloadFile = async (link) => {
    const newName = "photo" + Date.now() + ".jpg";
    await imageDownloader.image({
        url: link,
        dest: path.join(__dirname, '..', '..', 'uploads', newName),
    });
    return newName;
};


// exports.getUserByToken = async (token) => {
//     return jwt.verify(
//       token,
//       process.env.JWT_SECRET,
//       {},
//       async (err, userData) => {
//         if (err) throw err;
//         return userData
//       }
//     );
//   };
exports.getUserByToken = async (token) => {
    try {
      const userData = await jwt.verify(token, process.env.JWT_SECRET);
      return userData;
    } catch (error) {
      throw error; // Re-throw the error for the calling code to handle
    }
  };