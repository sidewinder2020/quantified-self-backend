const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../app')
const environment = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

chai.use(chaiHttp)

describe('API Endpoints', () => {
  describe('DELETE /api/v1/foods/:id',() => {
    beforeEach((done) => {
      database.migrate.latest()
        .then(function() {
          database.seed.run('../db/seeds/test/foods.js')
        })
        .then(() => done())
    })

    afterEach((done) => {
      database.migrate.rollback()
      .then(() => done())
    })

    it('will delete the food with the id passed in and return a 204', () => {
      return chai.request(server)
        .delete('/api/v1/foods/1')
        .then(function(response) {
          response.should.have.status(204)

          database.raw("SELECT COUNT(*) FROM foods")
            .then(function(result) {
              result.rowCount.should.equal(1)
            })
        })
    })

    it("will return a 404 if the food can't be found", () => {
      return chai.request(server)
        .delete('/api/v1/foods/3')
        .catch(function(error) {
          error.should.have.status(404)

          return database.raw("SELECT COUNT(*) FROM foods")
            .then(function(result) {
              return result.rowCount.should.equal(2)
            })
        })
    })
  })
})
