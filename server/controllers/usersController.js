const {
  selectUserByUsername,
  insertUserAndPassword
} = require("../models/usersModels");

const bcrypt = require("bcryptjs");
exports.getusersByUsername = (req, res, next) => {
  const { username } = req.params;
  selectUserByUsername(username)
    .then(user => {
      res.send({ user });
    })
    .catch(err => {
      // console.log(err);
      next(err);
    });
};

exports.postNewUser = (req, res, next) => {
  const { username } = req.body;
  const { password } = req.body;

  const hash = bcrypt.hashSync(password, 10);

  insertUserAndPassword(username, hash)
    .then(newUser => {
      res.status(201).send({ newUser });
    })
    .catch(err => {
      next(err);
    });

  // .catch(err => {
  //   // console.log(body);
  //   err.input = article_id;
  //   err.inputBody = JSON.stringify(body);
  //   // console.log(req.body.toString());
  //   next(err);
  // });
};
