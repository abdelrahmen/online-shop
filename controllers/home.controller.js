const productsModel = require("../models/products.model");

exports.getHome = (req, res, next) => {
  //get products

  //get category
  //if category exists & != all => filter
  //else render all
  let category = req.query.category;
  if (category && category != "all") {
    productsModel.getProductsByCategory(category).then((products) => {
      res.render("index", { products: products });
    });
  } else {
    productsModel.getAllProducts().then((products) => {
      //render index.ejs
      res.render("index", {
        products: products,
      });
    });
  }
};
