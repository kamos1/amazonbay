process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');

const server = require('../server/server');
const knex = require('../db/knex');

chai.use(chaiHttp);

describe('Client Routes', () => {
  it('should return the homepage', (done) => {
    chai.request(server)
    .get('/')
    .end((err, response) => {
      response.should.have.status(200);
      response.should.be.html;
      done();
    });
  });

  it('should return a 404 for a route that does not exist', (done) => {
    chai.request(server)
    .get('/404')
    .end((err, response) => {
      response.should.have.status(404);
      done();
    });
  });
});
