var express = require('express');
var router = express.Router();

// Controllers
const user_controller = require("../controllers/userController")
const message_controller = require("../controllers/messageController")

// Display index page on GET
router.get('/', function (req, res, next) {
    res.redirect("/messages?page=1");
});

// Display messages on GET (localhost:3000/messages?page=2)
router.get('/messages', user_controller.index);

// Display User signup form on GET
router.get('/signup', user_controller.signup_page);

// Handle User signup on POST
router.post('/signup', user_controller.user_create_post)

// Display Login form on GET
router.get('/login', user_controller.login_page);

// Handle User login on POST
router.post('/login', user_controller.user_login);

// Handle User logout on GET (redirect to index page)
router.get('/logout', user_controller.user_logout);

// Display Create Message form on GET
router.get("/create_message",message_controller.create_message_page);

// Handle Create Message on POST
router.post("/create_message", message_controller.create_message);

// Display Member Messages on GET
router.get("/user/:id/messages", message_controller.member_messages);

module.exports = router;
