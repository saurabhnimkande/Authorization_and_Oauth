module.exports = function (permittedRoles) {
  return function (req, res, next) {
    user = req.user.user;
    isAllowed = false;

    user.role.map((role) => {
      if (permittedRoles.includes(role)) {
        isAllowed = true;
      }
    });

    // if not then throw an error
    if (!isAllowed)
      return res.status(401).json({
        status: "failed",
        message: " You are not allowed to access this",
      });

    next();
  };
};
