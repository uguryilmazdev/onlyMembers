require("dotenv").config();
const session = require("express-session");
const MongoDBStore = require('connect-mongodb-session')(session);

// sessions setting
const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: process.env.SESSION_COLLECTION_NAME,
})

store.on("error", function(error) {
  console.log(error);
})

const sessionConfig = { 
    secret: process.env.SECRET, 
    resave: false, 
    saveUninitialized: false, 
    store: store, 
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000
    } 
};

module.exports = sessionConfig