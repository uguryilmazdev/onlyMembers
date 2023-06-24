const asyncHandler = require("express-async-handler");
const {body, validationResult} = require("express-validator");
const bcrypt = require('bcrypt');

const User = require("../models/user");

// Index page
exports.index = asyncHandler(async(req, res, next) => {
    res.render("index", {user: req.user});
})

// Get Signup page
exports.signup_page = asyncHandler(async(req, res, next) => {
    res.render("signup");
})

// Get login page
exports.login_page = asyncHandler(async (req, res, next) => {
    res.render("login")
})

// Handle User create on POST.
exports.user_create_post = [
       // Validate and sanitize fields.
    body("signupName")
       .trim()
       .notEmpty()
       .withMessage("Name is required.")
       .isLength({min: 3})
       .withMessage("User name must be at least have 3 characters.")
       .isLength({max: 20})
       .withMessage("User name must not exceed 20 characters.")
       .escape(),
   body("signupEmail")
       .trim()
       .notEmpty()
       .withMessage("Email is required.")
       .isEmail()
       .withMessage("Enter a valid mail.")
       .escape(),
    body("signupPassword")
        .trim()
        .notEmpty()
        .withMessage("Password is required.")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .withMessage('Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long')
        .escape(),
    body("signupConfirmPassword")
        .trim()
        .notEmpty()
        .withMessage("Confirm password is required.")
        .custom((value, { req }) => {
            if (value !== req.body.signupPassword) {
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
            name: req.body.signupName,
            email: req.body.signupEmail,
            password: await bcrypt.hash(req.body.signupPassword, 10),
        });

        console.log(user);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.
            res.render('signup', {
                errors: errors.array(),
            });
        } else {
            // Data from form is valid.
            try {
                await user.save();
                res.redirect("/");
              } catch (error) {
                console.log(error);
                next(error);
              }   
        }
    }),
];
 
