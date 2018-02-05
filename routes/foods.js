var express = require('express');
var router = express.Router();
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)
pry = require('pryjs')

router.get('/', function(req, res, next) {

  database.raw(
    'SELECT * FROM foods'
  ).then(function(foods) {
    if(!foods.rows) {
      return res.sendStatus(404)
    } else {
      res.json(foods.rows)
    }
  })
})

router.get('/:id', function(req, res, next) {
  var id = req.params.id

  database.raw(
    'SELECT * FROM foods WHERE id=?',
    [id]
  ).then(function(food) {
    if(!food.rows) {
      return res.sendStatus(404)
    } else {
      res.json(food.rows)
    }
  })
})

router.post('/', function(req, res, next) {
  var name = req.body.name
  var calories = req.body.calories

  if(!name) {
    return res.status(422).send({
      error: "No name property provided"
    })
  }
  else if(!calories) {
    return res.status(422).send({
      error: "No name property provided"
    })
  }

  database.raw(
    'INSERT INTO foods(name, calories, created_at, updated_at) VALUES (?, ?, ?, ?) RETURNING *',
    [name, calories, new Date, new Date]
  ).then(function(food) {
      res.status(201).json(food.rows)
  })
})

module.exports = router;
