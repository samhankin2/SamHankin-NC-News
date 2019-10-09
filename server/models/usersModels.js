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

exports.insertUserAndPassword = (username, password) => {
  console.log(username, password);
  let insertedObject = {
    username,
    avatar_url:
      "http://3.bp.blogspot.com/-Kuwn4MWYGdE/T1lm_yHk31I/AAAAAAAAC8I/SnqHNdBGDw4/s1600/Avatar%252C%2BAang%2BPapercraft%2BSmall%2BModel.jpg",
    name: username,
    password
  };
  return connection
    .insert(insertedObject)
    .into("users")
    .returning("*")
    .then(([postedUser]) => {
      //   console.log(postedComment);
      delete postedUser.password;
      return postedUser;
    });
};
