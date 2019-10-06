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

      return data[0];
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
  const sort = query.sort_by || "created_at";
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
      if (!data.length && query.author) {
        return Promise.all([data, doesExist(query.author)]);
      }

      if (!data.length && query.topic) {
        return Promise.all([data, doesExistTopic(query.topic)]);
      }
      // console.log(data);
      return Promise.all([data]);
    })
    .then(([data]) => {
      // console.log("hello");
      return data;
    });
};

doesExist = query => {
  return connection
    .select("*")
    .from("users")
    .where({ username: query })
    .then(data => {
      // console.log(data);
      if (data.length) return true;
      return Promise.reject({
        msg: "user not found in the database",
        status: 404
      });
    });
};

doesExistTopic = query => {
  return connection
    .select("*")
    .from("topics")
    .where({ slug: query })
    .then(data => {
      // console.log(data);
      if (data.length) return true;
      return Promise.reject({
        msg: "topic not found in the database",
        status: 404
      });
    });
};

doesExistComment = query => {
  return connection
    .select("*")
    .from("topics")
    .where({ slug: query })
    .then(data => {
      console.log(data);
      if (data.length) return true;
      return Promise.reject({
        msg: "topic not found in the database",
        status: 404
      });
    });
};
