export const logIn = async (req, res) => {
  res.send({ auth: req.user.auth, pathForRole: req.user.role_type });
};

export const getRole = async (req, res) => {
  res.send({ role: req.user.role });
};
