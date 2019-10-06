const commentsRouter = require("express").Router();
const {
  patchCommentVotesById,
  removeCommentById
} = require("../controllers/commentsController");

const invalidMethod = require("./invalidMethod");

commentsRouter
  .route("/:comment_id")
  .patch(patchCommentVotesById)
  .delete(removeCommentById)
  .all(invalidMethod);

module.exports = commentsRouter;
