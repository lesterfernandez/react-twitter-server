const isAuth = (req, res, next) => {
  if (req.user) {
    next();
  } else res.status(301).redirect(process.env.CLIENT_ROOT);
};

module.exports = isAuth;
