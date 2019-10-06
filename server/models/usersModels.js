const connection = require("../../connection.js");

exports.selectUserByUsername = username => {
  return connection
    .select("*")
    .from("users")
    .where({ username })
    .then(data => {
      if (data.length != 0) return data[0];
      return Promise.reject({
        status: 404,
        msg: `username:${username} is not in the database`
      });
    });
};
