const isAuth = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    // res.redirect(process.env.CLIENT_ROOT);
    res.send({ loggedIn: false });
  }
};

module.exports = isAuth;
