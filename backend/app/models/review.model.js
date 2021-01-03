const mongoose = require("mongoose");

const Review = mongoose.model(
  'Review',
  new mongoose.Schema({
    product_id: String,
    owner_name: String,
    owner_avatar: String,
    star: Number,
    comment: String
  })
);

module.exports = Review;
