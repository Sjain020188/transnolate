exports.up = function(knex, Promise) {
  return knex.schema.createTable("user_review", t => {
    t.increments() // auto-incrementing id column
      .index(); // index this column
    t.string("username", 100)
      .unsigned()
      .references("users.username"); // add a not-null constraint to this column
    t.string("review", 500).notNullable(); // add a not-null constraint to this column
    t.timestamp("created_at")
      .notNullable()
      .defaultTo(knex.fn.now()); // default to the current time
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("user_review");
};
