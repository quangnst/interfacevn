const mongoose = require("mongoose");

const File = mongoose.model(
  'File',
  new mongoose.Schema({
    files: String
  })
);

module.exports = File;
