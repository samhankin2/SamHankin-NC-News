const { selectUserByUsername } = require("./usersModels");

const bcrypt = require("bcryptjs");

exports.checkifMatch = (username, password) => {
  return selectUserByUsername(username).then(user => {
    return bcrypt.compareSync(password, user.password); // true
  });
};
