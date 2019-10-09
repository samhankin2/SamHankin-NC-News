exports.up = function(knex) {
  // console.log("creating the users table...");
  return knex.schema.createTable("users", usersTable => {
    usersTable.string("username").primary();
    usersTable.string("avatar_url").notNullable();
    usersTable.string("name").notNullable();
    usersTable.string("password");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
