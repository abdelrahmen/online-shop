const productsModel = require("../models/products.model");

exports.getProduct = (req, res, next) => {
  let id = req.params.id;
  productsModel.getProductsById(id).then((product) => {
    res.render("../views/product.ejs", { product: product });
  });
};
