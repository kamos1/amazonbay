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

describe('API Routes', () => {
  before((done) => {
    knex.migrate.latest()
    .then(() => {
      done();
    });
  });

  beforeEach((done) => {
    knex.seed.run()
    .then(() => {
      done();
    });
  });

  describe('GET /api/v1/inventory', () => {
    it('should return all items', (done) => {
      chai.request(server)
      .get('/api/v1/inventory')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.should.be.a('object');
        response.body.length.should.equal(3);
        done();
      });
    });

    it('should not return all items', (done) => {
      chai.request(server)
      .get('/api/v1/sadpath')
      .end((error, response) => {
        response.should.have.status(404);
        done();
      });
    });
  });

  describe('GET /api/v1/order', () => {
    it('should return all orders', (done) => {
      chai.request(server)
      .post('/api/v1/order')
      .send({
        total: 64
      })
      .end((error, response) => {
        chai.request(server)
        .get('/api/v1/order')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.should.be.a('object');
          done();
        });
      });
    });

    it('should not return all orders', (done) => {
      chai.request(server)
      .get('/api/v1/sadpath')
      .end((error, response) => {
        response.should.have.status(404);
        done();
      });
    });
  });

  describe('POST /api/v1/order', () => {
    it('should add an order', (done) => {
      chai.request(server)
      .post('/api/v1/order')
      .send({
        total: 64
      })
      .end((error, response) => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('id');
        response.body.id.should.equal(64.00);
        done();
      });
    });

  it('should not add an order', (done) => {
      chai.request(server)
      .post('/api/v1/order')
      .send({})
      .end((error, response) => {
        response.should.have.status(422);
        response.body.should.be.a('object');
        done();
      });
    });
  });
});
