const mongoose = require("mongoose");

const DB_URL = "mongodb://localhost:27017/online-shop";

const cartSchema = mongoose.Schema({
  userId: String,
  name: String,
  price: Number,
  amount: Number,
  productId: String,
  timestamp: Number,
});

const CartItem = mongoose.model("cart", cartSchema);

exports.addNewItem = (data) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => {
        return CartItem.find({
          userId: data.userId,
          productId: data.productId,
        });
      })
      .then((items) => {
        if (items.length != 0) {
          return CartItem.updateOne(
            { userId: data.userId, productId: data.productId },
            {
              amount: +data.amount + +items[0].amount,
              timestamp: data.timestamp,
            }
          );
        } else {
          let item = CartItem(data);
          return item.save();
        }
      })
      .then(() => {
        mongoose.disconnect();
        resolve();
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

exports.getItemsByUser = (userId) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() =>
        CartItem.find({ userId: userId }, {}, { sort: { timestamp: 1 } })
      )
      .then((items) => {
        mongoose.disconnect();
        resolve(items);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

exports.editItem = (id, newData) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => CartItem.updateOne({ _id: id }, newData))
      .then((items) => {
        mongoose.disconnect();
        resolve(items);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

exports.deleteItem = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => CartItem.findByIdAndDelete(id))
      .then((items) => {
        mongoose.disconnect();
        resolve(items);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
