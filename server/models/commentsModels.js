const connection = require("../../connection.js");

exports.updateCommentVotesById = (id, body) => {
  return connection("comments")
    .where({ comment_id: id })
    .increment("votes", body.inc_votes)
    .returning("*")
    .then(updatedComment => {
      //   console.log(updatedArticle);
      return updatedComment;
    });
};
exports.deleteCommentById = id => {};
