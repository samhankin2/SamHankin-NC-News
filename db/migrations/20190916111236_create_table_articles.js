exports.up = function(knex) {
  // console.log("creating the articles table...");
  return knex.schema.createTable("articles", articlesTable => {
    articlesTable.increments("article_id").primary();
    articlesTable.string("title").notNullable();
    articlesTable.text("body").notNullable();
    articlesTable
      .integer("votes")
      .notNullable()
      .defaultTo(0);
    articlesTable.string("author").references("users.username");
    articlesTable.string("topic").references("topics.slug");
    articlesTable
      .date("created_at")
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("articles");
};
