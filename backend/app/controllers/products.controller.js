const Product = require('../models/product.model');
const Review = require('../models/review.model');

exports.getAllProduct = (req, res) => {
  let perPage = 12;
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
      .populate('review')
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

exports.addProduct = (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    image: req.body.image,
    description: req.body.description
  });

  newProduct.save(newProduct)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Tutorial."
    });
  });
};

exports.addReview = async (req, res) => {
  const newReview = new Review({
    product_id: req.params.id,
    owner_name: req.body.owner_name,
    owner_avatar: req.body.owner_avatar,
    star: req.body.star,
    comment: req.body.comment
  });

  await newReview.save((error, newReview) => {
    if (error) {
      console.log(error);
    }
    res.send({
      product_id: newReview.product_id,
      owner_name: newReview.owner_name,
      owner_avatar: newReview.owner_avatar,
      star: newReview.star,
      comment: newReview.comment
    });
  });

  const product = await Product.findOne({ _id: req.params.id });

  product.review.push(newReview._id);
  product.save();
};
