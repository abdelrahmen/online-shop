const productsModel = require("../models/products.model");

exports.getHome = (req, res, next) => {
  let category = req.query.category;
  if (category && category != "all") {
    productsModel.getProductsByCategory(category).then((products) => {
      res.render("index", {
        products: products,
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        validationErrors: req.flash("validationErrors")[0],
      });
    });
  } else {
    productsModel.getAllProducts().then((products) => {
      res.render("index", {
        products: products,
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        validationErrors: req.flash("validationErrors")[0],
      });
    });
  }
};
