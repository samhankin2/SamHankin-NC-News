const connection = require("../../connection.js");

exports.selectArticleById = id => {
  return connection
    .select("articles.*")
    .from("articles")
    .where({ "articles.article_id": id })
    .count({ comment_count: "comment_id" })
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .then(data => {
      if (!data.length)
        return Promise.reject({
          msg: `article_id:${id} is not in the database`,
          status: 404
        });

      return data;
    });
};

exports.updateArticleById = (id, body) => {
  const bodyKeys = Object.keys(body);

  if (!bodyKeys.includes("inc_votes")) {
    return Promise.reject({
      msg: "Body does not contain property: inc_values",
      status: 400
    });
  }

  if (bodyKeys.length != 1) {
    return Promise.reject({
      msg: "Body must only have 1 property: inc_values",
      status: 400
    });
  }

  if (typeof body.inc_votes !== "number") {
    return Promise.reject({
      msg: "inc_values is not a number: " + body.inc_votes,
      status: 400
    });
  }

  return connection("articles")
    .where({ article_id: id })
    .increment("votes", body.inc_votes)
    .returning("*")
    .then(updatedArticle => {
      if (!updatedArticle.length)
        return Promise.reject({
          msg: `article_id:${id} is not in the database`,
          status: 404
        });

      return updatedArticle;
    });
};

exports.insertCommentByArticleId = (id, body) => {
  // body.article_id = id;
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
  const ord = order || "desc";

  if (ord != "desc" && ord != "asc") {
    return Promise.reject({
      msg: "Order must equal 'asc' or 'desc: " + order,
      status: 400
    });
  }

  return connection
    .select("*")
    .from("comments")
    .where({ article_id: id })
    .orderBy(sort, ord)
    .then(comments => {
      return comments;
    })
    .then(data => {
      if (!data.length)
        return Promise.reject({
          msg: `article_id:${id} is not in the database`,
          status: 404
        });

      return data;
    });
};

exports.selectArticles = query => {
  const sort = query.sortby || "created_at";
  let order = query.order || "desc";

  if (order != "desc" && order != "asc") {
    return Promise.reject({
      msg: "Order must equal 'asc' or 'desc: " + order,
      status: 400
    });
  }

  return connection
    .select("articles.*")
    .from("articles")
    .modify(queryBuilder => {
      if (query.author) queryBuilder.where("articles.author", query.author);
      if (query.topic) queryBuilder.where("articles.topic", query.topic);
    })
    .orderBy(sort, order)
    .count({ comment_count: "comment_id" })
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .then(data => {
      let invalid = "";

      if (!data.length) {
        if (query.author) {
          invalid += query.author + " ";
        }
        if (query.topic) {
          invalid += query.topic;
        }
        return Promise.reject({
          msg: "No articles by: " + invalid,
          status: 404
        });
      }
      return data;
    });
};
