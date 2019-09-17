const connection = require("../../connection.js");

exports.selectArticleById = id => {
  const articlePromise = connection
    .select("*")
    .from("articles")
    .where({ article_id: id });

  const commentsPromise = connection
    .select("*")
    .from("comments")
    .where({ article_id: id });

  return Promise.all([articlePromise, commentsPromise]).then(
    ([articles, comments]) => {
      articles[0].comment_count = comments.length;
      return articles[0];
    }
  );
};

exports.updateArticleById = (id, body) => {
  return connection("articles")
    .where({ article_id: id })
    .increment("votes", body.inc_votes)
    .returning("*")
    .then(updatedArticle => {
      //   console.log(updatedArticle);
      return updatedArticle;
    });
};

exports.insertCommentByArticleId = (id, body) => {
  body.article_id = id;
  //   console.log(body);
  let insertedObject = {
    article_id: id,
    body: body.body,
    author: body.username
  };

  return connection
    .insert(insertedObject)
    .into("comments")
    .returning("*")
    .then(postedComment => {
      //   console.log(postedComment);
      return postedComment;
    });
};

exports.selectCommentsByArticleId = (id, sortby, order) => {
  const sort = sortby || "created_at";
  const ord = order || "asc";
  return connection
    .select("*")
    .from("comments")
    .where({ article_id: id })
    .orderBy(sort, order)
    .then(comments => {
      return comments;
    });
};

exports.selectArticles = id => {};
