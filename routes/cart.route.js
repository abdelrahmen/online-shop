const router = require("express").Router();
const bodyParser = require("body-parser");
const authGuard = require("./guards/auth.guard");
const check = require("express-validator").check;

const cartController = require("../controllers/cart.controller");

router.get('/',authGuard.isAuth,cartController.getCart)

router.post(
  "/",
  authGuard.isAuth,
  bodyParser.urlencoded({ extended: true }),
  check("amount")
    .not()
    .isEmpty()
    .withMessage("amount in required")
    .isInt({ min: 1 })
    .withMessage("amount should be more than 0"),
    cartController.postCart
);

module.exports = router;
