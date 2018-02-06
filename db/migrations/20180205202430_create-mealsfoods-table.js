exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE mealsfoods(
    id SERIAL PRIMARY KEY NOT NULL,
    meal_id INTEGER,
    food_id INTEGER,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
  )`
  return knex.raw(createQuery)
};

exports.down = function(knex, Promise) {
  let dropQuery = `DROP TABLE mealsfoods`
  return knex.raw(dropQuery)
};
