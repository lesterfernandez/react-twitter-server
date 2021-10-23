const isAuth = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(process.env.CLIENT_ROOT);
  }
};

module.exports = isAuth;
