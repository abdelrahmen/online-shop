const router = require("express").Router();
const bodyParser = require("body-parser");
const check = require("express-validator").check;

const authController = require("../controllers/auth.controller");

router.get("/signup", authController.getSignup);

router.post(
  "/signup",
  bodyParser.urlencoded({ extended: true }),
  check("username").not().isEmpty().withMessage("username is required"),
  check("email")
    .not()
    .isEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid email"),
  check("password").isLength({ min: 6, max: 32 }).withMessage("password must be between 6 & 32 characters"),
  check("confirmPassword").custom((value, { req }) => {
    if ((value == req.body.password)) return true;
    else throw new Error("the 2 password fields must be equal");
  }),
  authController.postSignup
);

router.get("/login", authController.getLogin);

router.post(
  "/login",
  bodyParser.urlencoded({ extended: true }),
  authController.postLogin
);

router.all("/logout", authController.logout);

module.exports = router;
