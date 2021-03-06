/* eslint-disable consistent-return */
export function authenticationMiddleware() {
  return (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.send({auth: false})
  };
}
