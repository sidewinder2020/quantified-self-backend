exports.seed = function(knex, Promise) {
  return knex('foods').del()
    .then(function() {
      return knex('foods').insert([{
        id: 1,
        name: 'Donut',
        calories: 500,
        updated_at: new Date,
        created_at: new Date
      },
      {
        id: 2,
        name: 'Not Donut',
        calories: 0,
        updated_at: new Date,
        created_at: new Date
      }])
    })
}
