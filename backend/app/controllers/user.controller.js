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
