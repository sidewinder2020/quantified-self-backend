var express = require('express');
var router = express.Router();
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

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

module.exports = router;
