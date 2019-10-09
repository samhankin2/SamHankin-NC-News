const { checkifMatch } = require("../models/loginModels");

const bcrypt = require("bcryptjs");
exports.getUserPassword = (req, res, next) => {
  const { username, password } = req.body;
  checkifMatch(username, password)
    .then(match => {
      res.send(match);
    })
    .catch(matchFalse => {
      // console.log(err);
      res.send(false);
    });
};
