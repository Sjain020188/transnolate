exports.up = function(knex, Promise) {
  return knex.schema.alterTable("user_review", t => {
    t.foreign("username").references("users.email");
  });
};

exports.down = function(knex, Promise) {};
