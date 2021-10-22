// Runs passport auth setup
require("./auth.js");

require("dotenv").config();
const passport = require("passport");
const cors = require("cors");
const express = require("express");
const session = require("express-session");
const app = express();

// Allows body to be parsed as json
app.use(express.json());

// Allows cookies to be sent to url on different domain
app.use(cors({ origin: process.env.CLIENT_ROOT, credentials: true }));

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true, // resave cookies even if nothing changed
    saveUninitialized: false,
    cookie: {
      sameSite: "none", // cross site
      secure: true, // only https
      maxAge: 1000 * 60 * 60 * 24 * 14, // expiration time
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// app.set("trust proxy", 1); // if behind proxy

const indexRouter = require("./routes/indexRouter.js");
app.use("/", indexRouter);

const authRouter = require("./routes/authRouter.js");
app.use("/auth", authRouter);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server started listening on port : ${process.env.PORT}`);
});
