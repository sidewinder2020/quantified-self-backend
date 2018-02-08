var express = require('express');
var router = express.Router();
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)
pry = require('pryjs')

router.get('/', function(req, res, next) {

  database.raw(
    'SELECT * FROM meals'
  ).then(function(meals) {
    if(!meals.rows) {
      return res.sendStatus(404)
    } else {
      res.json(meals.rows)
    }
  })
})

router.get('/:id/foods', function(req, res, next) {
  var mealId = req.params.id

  var mealquery = database.raw('SELECT meals.id, meals.name from meals WHERE id=?',[mealId])
  var foodquery = database.raw('SELECT foods.id, foods.name,foods.calories from foods join mealsfoods on foods.id = mealsfoods.food_id join meals on meals.id = mealsfoods.meal_id where meals.id=?',[mealId])

  Promise.all([mealquery, foodquery]).then(function(mealfoodsarray) {
    if(!mealfoodsarray[0].rows) {
      return res.sendStatus(404)
    } else {
      var meal = mealfoodsarray[0].rows[0]
      meal["foods"] = mealfoodsarray[1].rows
      res.json(meal)
    }
  })
})

router.post('/:meal_id/foods/:id', function(req, res, next) {
  const meal_id = req.params.meal_id
  const food_id = req.params.id
  const check_meal_name = database('foods').where({id: food_id}).count('id')
  const check_food_name = database('meals').where({id: meal_id}).count('id')
  const find_meal_name = database('foods').where({id: food_id})
  const find_food_name = database('meals').where({id: meal_id})
  let food_count, meal_count
  let food_name, meal_name

  Promise.all([
    check_meal_name.then(function(result) {food_count = parseInt(result[0].count)}),
    check_food_name.then(function(result) {meal_count = parseInt(result[0].count)}),
    find_meal_name.then(function(result) {food_name = result[0].name}),
    find_food_name.then(function(result) {meal_name = result[0].name}),
  ])
    .then(function() {
      if ((food_count === 1) && (meal_count === 1)) {
        database('mealsfoods').insert({
          meal_id: meal_id,
          food_id: food_id,
          created_at: (new Date),
          updated_at: (new Date),
        })
          .then(function() {
            res.send({ "message": `Successfully added ${food_name} to ${meal_name}` })
          })
      } else {
        res.sendStatus(404)
      }
    })
})

router.delete('/:meal_id/foods/:id', function(req, res, next) {
  let meal_id = req.params.meal_id
  let food_id = req.params.id
  let find_meal_name = database('foods').where({id: food_id})
  let find_food_name = database('meals').where({id: meal_id})

  Promise.all([
    find_meal_name.then(function(result) {food_name = result[0].name}),
    find_food_name.then(function(result) {meal_name = result[0].name})
    ])
      .then(function() {
        database('mealsfoods').where({ meal_id: meal_id, food_id: food_id}).del()
          .then(function(result) {
            if (result === 1) {
              res.send({ "message": `Successfully removed ${food_name} from ${meal_name}` })
            } else {
              res.sendStatus(404)
            }
          })
      })
})

module.exports = router;
