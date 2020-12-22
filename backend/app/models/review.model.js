const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Review = mongoose.model(
  'Review',
  new mongoose.Schema({
    user_id: String,
    product_id: String,
    review: {
      star: Number,
      comment: String
    }
  })
);

module.exports = Review;
