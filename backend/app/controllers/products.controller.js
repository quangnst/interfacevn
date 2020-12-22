const Product = require('../models/product.model');
const Review = require('../models/review.model');

exports.getAllProduct = (req, res) => {
  let perPage = 9;
  let page = parseInt(req.query.page) || 0;
  let pages = 0;

  let name = req.query.name;
  let condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};
  Product.count().exec(function(err, count) {
    Product.find(condition)
      .limit(perPage)
      .skip(perPage * page)
      .exec(function(err, products) {
        pages = Math.floor(count / perPage);
        if (page === 0) {
          res.json({
            products,
            currentPage: page,
            pages,
            count,
            prevUrl: ``,
            nextUrl: `http://localhost:8080/api/products?page=${page + 1}`
          });
        } else if (page === pages - 1) {
          res.json({
            products: products,
            currentPage: page,
            pages,
            count,
            prevUrl: `http://localhost:8080/api/products?page=${page - 1}`,
            nextUrl: ``
          });
        } else if (page > 0 && page < pages) {
          res.json({
            products: products,
            currentPage: page,
            pages,
            count,
            prevUrl: `http://localhost:8080/api/products?page=${page - 1}`,
            nextUrl: `http://localhost:8080/api/products?page=${page + 1}`
          });
        } else {
          res.redirect('/products');
        }
      });
  });
};

exports.getProductById = (req, res) => {
  Product.findOne({ _id: req.params.id })
    .populate('review')
    .exec(function(err, product) {
      if (err) return console.log(err);
      res.status(200).json(product);
    });
};

exports.addReview = (req, res) => {
  console.log(req.body)
  const newReview = new Review({
    product_id: req.params.id,
    user_id: req.body.user_id,
    review: req.body.review
  });

  newReview.save((error, newReview) => {
    if (error) {
      console.log(error);
    }
    res.send({
      product_id: newReview.product_id,
      user_id: newReview.user_id,
      review: newReview.review
    });
  });
};
