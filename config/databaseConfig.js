require("dotenv").config();
const mongoose = require("mongoose");

// Connect MondoDB
mongoose.set("strictQuery", false);

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected.");
    } catch (error) {
        console.log("MongoDB connection error:", error);
    }
}

module.exports = connectDB;


