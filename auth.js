const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const pool = require("./db.js");
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

  // console.log("deserialize", user);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (_, __, profile, done) => {
      // make account in database

      const account = profile._json;
      let user = null;

      try {
        // check if exists
        const result = await pool.query(
          "SELECT id, fullname FROM users WHERE users.google_id=$1",
          [account.sub]
        );

        if (result.rows.length === 0) {
          // account non-existent
          await pool.query(
            "INSERT INTO users (fullname, img, google_id) VALUES($1,$2,$3)",
            [account.name, account.picture, account.sub]
          );

          const newAccId = await pool.query(
            "SELECT id FROM users WHERE users.google_id=$1",
            [account.sub]
          );

          user = {
            id: newAccId.rows[0].id,
            name: account.name,
            img_url: account.picture,
          };
        } else {
          user = {
            id: result.rows[0].id,
            name: result.rows[0].fullname,
            img_url: account.picture,
          };
        }
      } catch (err) {
        done(err);
      }
      done(null, user);

      // whatever user is retuned here,
      // is sent to serializeUser() to be set to the session store
    }
  )
);

module.exports = passport;
