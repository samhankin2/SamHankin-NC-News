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
      res.status(200).send({ article });
    })
    .catch(err => {
      err.input = article_id;
      next(err);
    });
};
exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const body = req.body;
  updateArticleById(article_id, body)
    .then(updatedArticle => {
      res.send({ article: updatedArticle[0] });
    })
    .catch(err => {
      err.input = article_id;
      next(err);
    });
};
exports.postCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const body = req.body;

  insertCommentByArticleId(article_id, body)
    .then(postedComment => {
      res.status(201).send({ comment: postedComment[0] });
    })
    .catch(err => {
      console.log(body);
      err.input = article_id;
      err.inputBody = JSON.stringify(body);
      // console.log(req.body.toString());
      next(err);
    });
};
exports.getCommentsByArticleId = (req, res, next) => {
  const { sort_by, order } = req.query;
  const { article_id } = req.params;
  selectCommentsByArticleId(article_id, sort_by, order)
    .then(comments => {
      res.send({ comments });
    })
    .catch(err => {
      err.input = article_id;
      next(err);
    });
};
exports.getArticles = (req, res, next) => {
  selectArticles(req.query)
    .then(articles => {
      res.send({ articles });
    })
    .catch(err => {
      next(err);
    });
};
