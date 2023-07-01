const asyncHandler = require("express-async-handler");
const {body, validationResult} = require("express-validator");
const Message = require("../models/message");

// Handle Create Message page
exports.create_message_page = asyncHandler(async (req, res, next) => {
    res.render("create_message", {errors: [], formData: {}});
})

exports.create_message = [
     // Validate and sanitize field.
    body("messageTitle")
        .trim()
        .isLength({min: 3})
        .withMessage("Title must have at least 3 characters.")
        .isLength({max: 128})
        .withMessage("Title must not exceed 128 characters.")
        .escape(),
    body("messageText")
        .trim()
        .isLength({min: 1})
        .withMessage("Message must have at least 1 characters.")
        .isLength({max: 1024})
        .withMessage("Message must not exceed 1024 characters.")
        .escape(),

    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create Message object with escaped and trimmed data.
        const message = Message({
            messageTitle: req.body.messageTitle,
            messageText: req.body.messageText,
            user: req.user._id,
        })

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.
            res.render("create_message", {
                errors: errors.array(),
                formData: req.body
            })
        } else {
            // Data from form is valid.
            try {
                await message.save();
                res.redirect("/");
            } catch(error) {
                console.log(error);
                next(error);
            }
            
        }
    })


];