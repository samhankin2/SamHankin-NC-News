const commentsRouter = require("express").Router();
const {
  patchCommentVotesById,
  deleteCommentById
} = require("../controllers/commentsController");

commentsRouter.patch("/:comment_id", patchCommentVotesById);
commentsRouter.delete("/:comment_id", deleteCommentById);

module.exports = commentsRouter;
