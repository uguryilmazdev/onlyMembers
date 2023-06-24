const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create model
const UserSchema = new Schema({
    name: {type: String, required: true, minLength: 3, maxLength: 20},
    email: {
        type: String, 
        required: true, 
        unique: true, 
        validate: {
            validator: function(value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            },
            message: "Enter a valid email."
    }},
    password: {
        type: String, 
        required: true, 
        validate: {
            validator: function(value) {
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                return passwordRegex.test(value);
            },
            message: "Must contain 8 characters: one uppercase, one lowercase, one number and one special character."    
    }},
    messages: [{type: Schema.Types.ObjectId, ref: "Messages"}]
})

// Virtual for User's URL
UserSchema.virtual('url').get(function () {
    return `/user/${this._id}`;
})

// Export model
module.exports = mongoose.model('User', UserSchema);