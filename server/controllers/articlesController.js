const {
  selectArticleById,
  updateArticleById,
  insertCommentByArticleId,
  selectCommentsByArticleId,
  selectArticles
} = require("../models/articlesModels");

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleById(article_id)
    .then(article => {
      res.send({ article });
    })
    .catch(console.log);
};
exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const body = req.body;
  updateArticleById(article_id, body).then(updatedArticle => {
    res.send({ article: updatedArticle[0] });
  });
};
exports.postCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const body = req.body;

  insertCommentByArticleId(article_id, body).then(postedComment => {
    res.status(201).send({ comment: postedComment[0] });
  });
};
exports.getCommentsByArticleId = (req, res, next) => {
  const { sort_by, order } = req.query;
  const { article_id } = req.params;
  selectCommentsByArticleId(article_id, sort_by, order).then(comments => {
    res.send({ comments });
  });
};
exports.getArticles = (req, res, next) => {};
