const express = require("express");
const path = require("path");

const session = require("express-session");
const SessionStore = require("connect-mongodb-session")(session);
const flash = require('connect-flash')

const homeRouter = require("./routes/home.route.js");
const productRouter = require("./routes/product.route");
const authRouter = require("./routes/auth.route");

const app = express();

app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "images")));
app.use(flash())
const STORE = new SessionStore({
  uri: "mongodb://localhost:27017/online-shop",
  collection: "sessions",
});

app.use(
  session({
    secret: "this is a string that supposed to help in encrypting the sesions ",
    saveUninitialized: false,
    cookie: { maxAge: 3600000 },
    store: STORE
  })
);

app.set("view engine", "ejs");
app.set("views", "views");

app.use("/", homeRouter);
app.use("/", authRouter);
app.use("/product", productRouter);

app.listen(3000, (err) => {
  console.log("server listening on port 3000, http://localhost:3000");
});
