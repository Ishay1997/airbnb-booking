const fs = require('fs');
const imageDownloader = require("image-downloader");

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
        dest: __dirname + "/uploads/" + newName,
    });
    return newName;
};