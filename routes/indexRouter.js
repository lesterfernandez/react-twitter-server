const express = require("express");
const isAuth = require("../isAuth");
const router = express.Router();
const pool = require("../db.js");

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

router.post("/new_post", isAuth, async (req, res) => {
  // new post here
  console.log("Post is: ", req.body.post);
  await pool.query("INSERT INTO posts (post_author, body) VALUES($1, $2)", [
    req.user.id,
    req.body.post,
  ]);
  // res.status(200).send();
  res.status(200).send();
});

router.get("/feed", isAuth, async (req, res) => {
  // get feed
  const feed = await pool.query(
    "SELECT u.fullname, p.body FROM users u INNER JOIN posts p on u.id = p.post_author"
  );
  const result = {
    posts: feed.rows,
  };
  // console.log(result);
  res.json(result);
});

module.exports = router;
