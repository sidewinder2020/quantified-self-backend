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

module.exports = router;
