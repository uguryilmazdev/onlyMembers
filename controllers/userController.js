const asyncHandler = require("express-async-handler");
const {body, validationResult} = require("express-validator");
const bcrypt = require('bcrypt');
const passport = require("passport");
const User = require("../models/user");
const Message = require("../models/message")

// Handle index page
exports.index = asyncHandler(async(req, res, next) => {
    // Get details of messages.
    const messages = await Message.find().exec();
    console.log(messages);
    res.render("index", {
        user: req.user,
        messages: messages
    });
})

// Handle signup page
exports.signup_page = asyncHandler(async(req, res, next) => {
    res.render("signup", {errors: [], formData: {}});
})

// Handle login page
exports.login_page = asyncHandler(async (req, res, next) => {
    res.render("login", {errors: [], formData: {}})
})

// Handle User create on POST.
exports.user_create_post = [
    // Validate and sanitize fields.
    body("name")
       .trim()
       .isLength({min: 3})
       .withMessage("Username must have at least 3 characters.")
       .isLength({max: 64})
       .withMessage("Username must not exceed 64 characters.")
       .escape(),
   body("email")
       .trim()
       .isEmail()
       .withMessage("Enter a valid email.")
       .escape(),
    body("password")
        .trim()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,128}$/)
        .withMessage('Password must have at least 8 characters and must contain one uppercase, one lowercase, one number and one special character.')
        .escape(),
    body("confirmPassword")
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Password do not match.")
            }
            return true;
        })
        .withMessage("Passwords must match.")
        .escape(),

    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a User object with escaped and trimmed data.
        const user = User({
            name: req.body.name,
            email: req.body.email,
            // Encrypt the password.
            password: await bcrypt.hash(req.body.password, 10),
        });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.
            res.render('signup', {
                errors: errors.array(),
                formData: req.body
            });
        } else {
            // Data from form is valid.
            try {
                // Check username and email for existence.
                const existingUsername = await User.findOne({name: req.body.name});
                const existingEmail = await User.findOne({email: req.body.email});
                
                if (existingUsername) {
                    // Username already exists. Re-render signup page.
                    return res.render("signup", {
                        errors: [{msg: "The username already exists.", path:"existedUsername"}],
                        formData: req.body
                    })
                }

                if (existingEmail) {
                    // Email address already exists. Re-render signup page.
                    return res.render("signup", {
                        errors: [{msg: "The email address already exists.", path:"existedEmail"}],
                        formData: req.body
                    }) 
                }

                // If it is a new user, save.
                await user.save();
                res.redirect("/");
              } catch (error) {
                console.log(error);
                next(error);
              }   
        }
    }),
];

// Handle User login on POST
exports.user_login = [
    // Validate and sanitize fields.
    body("email")
        .trim()
        .isEmail()
        .withMessage("Enter a valid email.")
        .escape(),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required.")
        .escape(),

    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // If any input error, render login again with errors
            res.render("login", {
                errors: errors.array(),
              });
        } else {
            // Clear session messages
            req.session.messages = [];

            passport.authenticate("local", function(err, user, info) {
                if (err) { 
                    return next(err)
                }

                if (!user) {
                    return res.render("login", {
                        message: info.message,
                        formData: req.body
                    })
                }

                req.logIn(user, function(err) {
                    if (err) {
                        return next(err)
                    }
                    return res.redirect("/")
                });
            })(req, res, next); 
        }
    })
];

exports.user_logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
    
}


 
