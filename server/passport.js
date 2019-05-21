const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("./knex.js");

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  passport.use(
    new LocalStrategy(
      { passRequestToCallback: true },
      async (username, password, done) => {
        await loginAttempt();
        async function loginAttempt() {
          try {
            const user = await db("users")
              .select()
              .where({ username });
            console.log("passport", user);
            if (user.length === 0) {
              console.log("no user found");
              return done(null, false, { message: "Incorrect password." });
            } else {
              if (user[0].password === password) {
                return done(null, user);
              } else {
                return done(null, false, { message: "Incorrect password." });
              }
            }
          } catch (err) {
            console.log(err);
          }
        }
      }
    )
  );
};
