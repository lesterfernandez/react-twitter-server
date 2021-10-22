const isAuth = (req, res, next) => {
  if (req.user.id) next();
  else res.status(301);
};

module.exports = isAuth;
