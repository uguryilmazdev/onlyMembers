var express = require('express');
var router = express.Router();

// Controllers
const user_controller = require("../controllers/userController")

// GET home page
router.get('/', user_controller.index);

// GET request for CREATING user
router.get('/signup', user_controller.signup_page);

// POST request for CREATING user
router.post('/signup', user_controller.user_create_post)

// GET login page
router.get('/login',user_controller.login_page);


module.exports = router;
