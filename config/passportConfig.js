const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const bcrypt = require('bcrypt');

passport.use("local",
    new LocalStrategy(
      {usernameField: "email", passwordField: "password", failureFlash: true},
      async(email, password, done) => {
        try {
            // Get User
            const user = await User.findOne ({ email: email });

            if (!user) {
                // Return error message if user does not exist.
                return done(null, false, { message: "Incorrect email." });
            };

            // Compare password
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                // Return error message if password does not match
                return done(null, false, { message: "Incorrect password." })
            };

            // Return User
            return done(null, user);

        } catch(err) {
            return done(err);
        };
    })
);

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
passport.deserializeUser(async function(id, done) {
try {
    const user = await User.findById(id);
    done(null, user);
} catch(err) {
    done(err);
};
});

module.exports = passport;