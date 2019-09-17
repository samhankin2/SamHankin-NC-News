const { selectUserByUsername } = require("../models/usersModels");
exports.getusersByUsername = (req, res, next) => {
  const { username } = req.params;
  selectUserByUsername(username).then(user => {
    res.send({ user });
  });
};
