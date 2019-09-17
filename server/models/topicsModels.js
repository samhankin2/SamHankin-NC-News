const connection = require("../../connection.js");

exports.selectTopics = () => {
  return connection
    .select("*")
    .from("topics")
    .then(data => {
      return data;
    });
};
