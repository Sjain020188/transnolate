exports.up = function(knex, Promise) {
  return knex.schema.alterTable("users", t => {
    t.unique("email");
  });
};

exports.down = function(knex, Promise) {};
