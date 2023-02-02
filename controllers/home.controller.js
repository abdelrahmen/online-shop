const productsModel = require("../models/products.model");

exports.getHome = (req, res, next) => {
  //get products
  productsModel.getAllProducts().then((products) => {
    //render index.ejs
    res.render("index", {
      products: products,
    });
  });
};
