const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create model
const UserSchema = new Schema({
    name: {
        type: String, 
        required: true, 
        minLength: 3, 
        maxLength: 20,
        unique: true,
    },
    email: {
        type: String, 
        required: true, 
        unique: true, 
        },
    password: {
        type: String, 
        required: true, 
        }
})

// Virtual for User's URL
UserSchema.virtual('url').get(function () {
    return `/user/${this._id}`;
})

// Export model
module.exports = mongoose.model('User', UserSchema);