const commentsRouter = require("express").Router();
const {
  patchCommentVotesById,
  removeCommentById
} = require("../controllers/commentsController");

commentsRouter.patch("/:comment_id", patchCommentVotesById);
commentsRouter.delete("/:comment_id", removeCommentById);

module.exports = commentsRouter;
