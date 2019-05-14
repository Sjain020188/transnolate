exports.up = function(knex, Promise) {
  return knex.schema.alterTable("users", t => {
    t.string("username", 100).notNullable(); // auto-incrementing id colum
  });
};

exports.down = function(knex, Promise) {};
