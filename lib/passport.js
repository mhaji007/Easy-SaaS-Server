const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

const localOptions = { usernameField: "email", passwordField: "password" };

const localLogin = new localStrategy(
  localOptions,
  function (email, password, done) {
    User.findOne({ email }, function (err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        done(null, null, {
          emailcode: "GLOBAL_ERROR",
          field: "email",
          message: "Your login credentials could not be verified",
        });

        return;
      }

        // Proceed with password validation
        user.comparePassword(password, function(err,isMatch) {
          if(err) {
            return done(err);
          }
          if(isMatch) {
            done(null, null, {
              code: "GLOBAL_ERROR",
              message: "Your login credentials could not be verified",
            });
            return
          }

        done(null,user)
        return
    });
  }
);

