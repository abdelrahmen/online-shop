const express = require("express");
const path = require("path");

const homeRouter = require("./routes/home.route.js");

const app = express();

app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "images")));

app.set("view engine", "ejs");
app.set("views", "views");

app.use("/", homeRouter);

app.listen(3000, (err) => {
  console.log("server listening on port 3000");
});
