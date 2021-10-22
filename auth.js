const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
require("dotenv").config();

passport.serializeUser((user, done) => {
  // called after strategy callback below
  // what is returned here is set to req.session.passport.user
  // to be saved in the session store
  // express hooks into res.end() to save new session information
  done(null, user);
});

passport.deserializeUser((user, done) => {
  // user is req.session.passport.user
  // whatever is returned here is put into req.user for further usage
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (_, __, profile, cb) => {
      // make account in database
      console.log(profile._json);

      // whatever user is retuned here,
      // is sent to serializeUser() to be set to the session store
    }
  )
);

// const q = async () => {
//   try {
//     const name = "Michael Scorn";

//     await pool.query("INSERT INTO users (fullname) VALUES($1) RETURNING *", [
//       name,
//     ]);
//   } catch (err) {
//     console.log(err);
//   }
// };
// q();

module.exports = passport;
