const router = require("express").Router();
let { check } = require("express-validator");

const adminController = require('../controllers/admin.controller');
const adminGuard = require('./guards/admin.guard');

router.get('/add', adminGuard, adminController.getAdd)

module.exports = router;
