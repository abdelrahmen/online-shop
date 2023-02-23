const validationResult = require("express-validator").validationResult;
const productsModel = require("../models/products.model");

exports.getAdd = (req, res, next) => {
  res.render("add-product", {
    validationErrors: req.flash("validationErrors"),
    isUser: true,
    isAdmin: true,
    pageTitle: 'add-product'
  });
};

exports.postAdd = (req, res, next) => {
  if (validationResult(req).isEmpty()) {
    req.body.image = req.file.filename;
    productsModel
      .addNewProduct(req.body)
      .then(() => {
        req.flash("added".true);
        res.redirect("/admin/add");
      })
      .catch((err) => res.redirect('/error'));
  } else {
    req.flash("validationErrors", validationResult(req).array());
    res.redirect("/admin/add");
  }
};
