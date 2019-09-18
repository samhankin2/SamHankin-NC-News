const connection = require("../../connection.js");

exports.updateCommentVotesById = (id, body) => {
  const bodyKeys = Object.keys(body);

  if (!bodyKeys.includes("inc_votes")) {
    return Promise.reject({
      msg: "Body does not contain property: inc_values",
      status: 400
    });
  }

  if (bodyKeys.length != 1) {
    return Promise.reject({
      msg: "Body must only have 1 property: inc_values",
      status: 400
    });
  }

  if (typeof body.inc_votes !== "number") {
    return Promise.reject({
      msg: "inc_values is not a number: " + body.inc_votes,
      status: 400
    });
  }

  return connection("comments")
    .where({ comment_id: id })
    .increment("votes", body.inc_votes)
    .returning("*")
    .then(updatedComment => {
      if (!updatedComment.length) {
        return Promise.reject({
          msg: `comment_id:${id} is not in the database`,
          status: 404
        });
      }

      return updatedComment;
    });
};
exports.deleteCommentById = id => {
  return connection("comments")
    .where({ comment_id: id })
    .del()
    .returning("*")
    .then(deletedComment => {
      if (!deletedComment.length) {
        return Promise.reject({
          msg: `comment_id:${id} is not in the database`,
          status: 404
        });
      }
    });
};
