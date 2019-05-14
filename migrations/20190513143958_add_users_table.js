exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", t => {
    t.increments() // auto-incrementing id column
      .index(); // index this column
    t.string("first_name", 100).notNullable(); // add a not-null constraint to this column
    t.string("last_name", 100).notNullable(); // add a not-null constraint to this column
    t.string("phone_number", 100).index();
    t.string("email", 100).index();

    t.timestamp("created_at")
      .notNullable()
      .defaultTo(knex.fn.now()); // default to the current time
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
};
