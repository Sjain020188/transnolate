exports.up = function(knex, Promise) {
  return knex.schema.alterTable("users", t => {
    t.string("password", 100); // auto-incrementing id colum
  });
};

exports.down = function(knex, Promise) {};
