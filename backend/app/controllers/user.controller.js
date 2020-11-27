const User = require('../models/user.model');
const uploadFile = require("../middlewares/upload");

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.profileBoard = (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'A list of all course'
  });
};

exports.getUserById = (req, res) => {
  User.findById(req.params.id, function(err, product) {
    if (err) return console.log(err);
    res.status(200).json(product);
  });
};

exports.updateUserById = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    (err, user) => {
      if (err) res.send(err);
      res.status(200).json(user);
    }
  );
};

exports.upload = async(req, res) => {
  try {
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: 'Please upload a file!' });
    }

    res.status(200).send({
      message: 'Uploaded the file successfully: ' + req.file.originalname
    });
  } catch (err) {
    console.log(err);

    if (err.code == 'LIMIT_FILE_SIZE') {
      return res.status(500).send({
        message: 'File size cannot be larger than 2MB!'
      });
    }

    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`
    });
  }
};