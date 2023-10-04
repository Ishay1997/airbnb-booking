const fs = require('fs');
const { uploadFile, downloadFile ,getUserByToken} = require('./service');
exports.upload = async (req, res) => {
  const { files } = req;
  const uploadedFiles = [];

  for (const file of files) {
    const newFile = uploadFile(file);
    uploadedFiles.push(newFile);
  }

  res.json(uploadedFiles);
};

exports.uploadByLink = async (req, res) => {
  const { link } = req.body;
  const newName = await downloadFile(link);
  res.json(newName);
};