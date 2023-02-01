// #1 import mongoose
const mongoose = require("mongoose");

// #2 URL string
const DB_URL = "mongodb://localhost:27017/";

// #3 make the model schema
const productSchema = mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  description: String,
  category: String,
});

// #4 make the data model with the defined schema
const product = mongoose.model("product", productSchema);

// #5 export the data
exports.getAllProducts = () => {
  // #6 connect to the database
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => {
        // #7 find the products
        return product.find({});
      })
      .then((products) => {
        // #8 disconnect & resolve
        mongoose.disconnect();
        resolve(products);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
