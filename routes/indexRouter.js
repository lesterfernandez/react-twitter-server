const express = require("express");
const isAuth = require("../isAuth");
const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("<a href='/auth/google'>Login</a>");
// });

router.get("/account", isAuth, (req, res) => {
  res.send(req.user);
});

router.get("/logout", isAuth, (req, res) => {
  req.logout();
  res.send("User logged out");
});

module.exports = router;
