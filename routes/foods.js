var express = require('express');
var router = express.Router();
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

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
      res.json(food.rows[0])
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
      error: "No calorie property provided"
    })
  }

  database.raw(
    'INSERT INTO foods(name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
    [name, calories, new Date, new Date]
  ).then(function(food) {
      res.status(201).json(food.rows)
  })
})

router.delete('/:id', function(req, res, next) {
  let id = req.params.id

  return database('foods').where({ id: id }).del()
  .then(function(result) {
    if (result === 1) {
      return res.sendStatus(204)
    } else {
      return res.sendStatus(404)
    }
  })
})

router.patch('/:id', function(req, res, next) {
  let id = req.params.id
  let updatedInfo = req.body.food

  if (!updatedInfo) {
    return res.send(422).send({
      error: "No parameters provided."
    })
  }

  database('foods').where('id', id).update(updatedInfo)
    .then(function(success) {
      database('foods').where('id', id)
      .then(function(food) {
        res.status(201).json(food[0])
      })
    })
})

module.exports = router;
