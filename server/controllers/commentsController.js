const {
  updateCommentVotesById,
  deleteCommentById
} = require("../models/commentsModels");

exports.patchCommentVotesById = (req, res, next) => {
  const comment_id = req.params;
  const body = req.body;
  updateCommentVotesById(comment_id, body)
    .then(newComment => {
      res.send({ comment: newComment[0] });
    })
    .catch(console);
};

exports.removeCommentById = (req, res, next) => {
  const comment_id = req.params;
  deleteCommentById(comment_id).then(() => {
    res.status(204);
  });
};
