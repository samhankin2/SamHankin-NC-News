const {
  topicData,
  articleData,
  commentData,
  userData
} = require("../data/index.js");

const { formatDates, formatComments, makeRefObj } = require("../utils/utils");

exports.seed = function(knex) {
  // console.log(topicData);
  const topicsInsertions = knex("topics").insert(topicData);
  const usersInsertions = knex("users").insert(userData);

  return Promise.all([topicsInsertions, usersInsertions])
    .then(() => {
      let formattedArticleData = formatDates(articleData);
      return knex("articles")
        .insert(formattedArticleData)
        .returning("*");
    })
    .then(articleRows => {
      const articleRef = makeRefObj(articleRows, "title", "article_id");

      const formattedComments = formatComments(commentData, articleRef);
      // console.log(formattedComments);

      //belongs_to is the first key
      return knex("comments").insert(formattedComments);
    });
};
