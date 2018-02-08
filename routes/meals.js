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

module.exports = router;
