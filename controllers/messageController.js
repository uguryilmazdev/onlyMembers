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

exports.member_messages = asyncHandler(async(req,res,next) => {
    const messages = await Message.find({user: req.params.id}).sort({createdAt: -1}).populate("user").exec();

    const currentPage = req.query.page || 1; // messages?page=
    const pageSize = 8; // messages per page
    const pageCount = Math.ceil(messages.length / pageSize); // total page 
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = currentPage * pageSize;
    const selectedMessage = messages.slice(startIndex, endIndex);
    let memberMessages = false;

    // check user has authenticated?
    const isAuthenticated = req.isAuthenticated(); 

    // if true, show member's own messages
    // else, show other member's messages
    if (req.user.url === req.params.id) {
        memberMessages = true;
    }

    res.render("member_messages", {
        user: req.user,
        userid: req.params.id,
        messages: selectedMessage,
        currentPage: currentPage,
        pageCount: pageCount,
        memberMessages: memberMessages,
        isAuthenticated: isAuthenticated,
    });
})