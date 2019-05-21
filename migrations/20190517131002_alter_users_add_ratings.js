exports.up = function(knex, Promise) {
  return knex.schema.alterTable("users", t => {
    t.integer("rating");
    t.unique("username");
  });
};

exports.down = function(knex, Promise) {};
