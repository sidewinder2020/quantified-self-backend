var express = require('express');
var router = express.Router();
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

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
        res.status(201).json(food)
      })
    })
})

module.exports = router;
