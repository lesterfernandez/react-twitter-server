const express = require("express");
const isAuth = require("../isAuth");
const router = express.Router();

router.get("/account", isAuth, (req, res) => {
  const user = {
    ...req.user,
    loggedIn: true,
  };
  res.send(user);
});

router.get("/logout", isAuth, (req, res) => {
  req.logout();
  res.send("User logged out");
});

module.exports = router;
