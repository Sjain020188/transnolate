exports.up = function(knex, Promise) {
  return knex.schema.alterTable("user_review", t => {
    t.dropForeign("username");
  });
};

exports.down = function(knex, Promise) {};
