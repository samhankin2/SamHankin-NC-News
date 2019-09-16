const articlesRouter = require("express").Router();
const {
  getArticleById,
  patchArticleById,
  postCommentByArticleId,
  getCommentsByArticleId,
  getArticles
} = require("../controllers/articlesController");

articlesRouter.get("/:article_id", getArticleById);
articlesRouter.patch("/:article_id", patchArticleById);
articlesRouter.post("/:article_id", postCommentByArticleId);
articlesRouter.get("/");

module.exports = articlesRouter;
