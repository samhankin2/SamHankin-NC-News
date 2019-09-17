const connection = require("../../connection.js");

exports.selectUserByUsername = username => {
  return connection
    .select("*")
    .from("users")
    .where({ username: username })
    .then(data => {
      return data[0];
    });
};
