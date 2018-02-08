exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE mealsfoods RESTART IDENTITY')
  .then(function() {
    return Promise.all([
      knex.raw(
        'INSERT INTO mealsfoods (meal_id, food_id, created_at, updated_at) VALUES (?, ?, ?, ?)',
        [1, 1, new Date, new Date]
      ),
      knex.raw(
        'INSERT INTO mealsfoods (meal_id, food_id, created_at, updated_at) VALUES (?, ?, ?, ?)',
        [1, 2, new Date, new Date]
      ),
      knex.raw(
        'INSERT INTO mealsfoods (meal_id, food_id, created_at, updated_at) VALUES (?, ?, ?, ?)',
        [2, 3, new Date, new Date]
      ),
      knex.raw(
        'INSERT INTO mealsfoods (meal_id, food_id, created_at, updated_at) VALUES (?, ?, ?, ?)',
        [2, 4, new Date, new Date]
      ),
      knex.raw(
        'INSERT INTO mealsfoods (meal_id, food_id, created_at, updated_at) VALUES (?, ?, ?, ?)',
        [3, 5, new Date, new Date]
      ),
      knex.raw(
        'INSERT INTO mealsfoods (meal_id, food_id, created_at, updated_at) VALUES (?, ?, ?, ?)',
        [3, 6, new Date, new Date]
      ),
      knex.raw(
        'INSERT INTO mealsfoods (meal_id, food_id, created_at, updated_at) VALUES (?, ?, ?, ?)',
        [4, 7, new Date, new Date]
      ),
      knex.raw(
        'INSERT INTO mealsfoods (meal_id, food_id, created_at, updated_at) VALUES (?, ?, ?, ?)',
        [4, 8, new Date, new Date]
      )
    ])
  })
}
