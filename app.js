require("dotenv").config();
const cors = require("cors");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
// Runs passport auth setup
require("./auth.js");
const app = express();

// Allows body to be parsed as json
app.use(express.json());

// Allows cookies to be sent to url on different domain
app.use(cors({ origin: process.env.CLIENT_ROOT, credentials: true }));
app.set("trust proxy", 1); // if behind proxy

const inProd = process.env.NODE_ENV === "production";

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true, // resave cookies even if nothing changed
    saveUninitialized: false,
    cookie: {
      sameSite: `${inProd ? "none" : "lax"}`, // cross site // set lax while working with http:localhost, but none when in prod
      secure: `${inProd ? "true" : "auto"}`, // only https, auto when dev, true when prod
      maxAge: 1000 * 60 * 60 * 24 * 14, // expiration time
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

const indexRouter = require("./routes/indexRouter.js");
app.use("/", indexRouter);

const authRouter = require("./routes/authRouter.js");
app.use("/auth", authRouter);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server started listening on port : ${process.env.PORT}`);
});

const pool = require("./db");
const pgClearInterval = 1000 * 60 * 5;
setInterval(() => {
  pool.query("DELETE FROM posts p WHERE p.post_author != 13");
  pool.query("DELETE FROM users u WHERE u.id != 13");
}, pgClearInterval);
