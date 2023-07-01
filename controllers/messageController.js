const asyncHandler = require("express-async-handler");
const {body, validationResult} = require("express-validator");

// Handle Create Message page
exports.create_message_page = asyncHandler(async (req, res, next) => {
    res.render("createMessage");
})