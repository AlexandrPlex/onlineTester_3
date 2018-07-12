export const logIn = async (req, res) => {
 res.send({ auth: req.user.auth,
      role_type: req.user.role_type });
};

export const failLogIn = async (req, res) => {
  res.send({ auth: false });
};


export const getRole = async (req, res) => {
  res.send({auth: req.user.auth, role_type: req.user.role_type });
};

export const logOut = async (req, res) => {
  req.session.destroy();
  res.send('session clear');
};
