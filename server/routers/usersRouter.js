const articlesRouter = require("express").Router();
const {
  patchCommentVotesById,
  deleteCommentById
} = require("../controllers/articlesController");

articlesRouter.patch("/:comment_id", patchCommentVotesById);
articlesRouter.delete("/:comment_id", deleteCommentById);

module.exports = articlesRouter;
