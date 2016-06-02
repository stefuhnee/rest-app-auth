'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = require('chai').request;
const mongoose = require('mongoose');
const getBasic = require('../lib/get-basic');
const dbPort = process.env.MONGOLAB_URI;

process.env.MONGOLAB_URI = 'mongodb://localhost/test_db';
require('../server');

describe('unit tests', () => {

  it('should decode a basic auth string into username and password', () => {

    let baseString = new Buffer('user:pass').toString('base64');
    let authString = 'Basic ' + baseString;
    let req = {
      headers:
      {
        authorization: authString
      }
    };

    getBasic(req, {}, () => {
      expect(req.auth).to.eql({username: 'user', password: 'pass'});
    });
  });
});

describe('auth tests', () => {

  after((done)=> {
    process.env.MONGOLAB_URI = dbPort;
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should sign up a new user', (done) => {
    request('localhost:3000')
    .post('/signup')
    .send({username:'test', password:'test'})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body).to.eql({token: 'access granted'});
      done();
    });
  });

  it('should sign in a user with a token', (done) => {
    request('localhost:3000')
    .get('/login')
    .auth('test', 'test')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body).to.eql({token: 'access granted'});
      done();
    });
  });
});

describe('catch all test', () => {

  it('should give an error for unsupported routes', (done) => {
    request('localhost:3000')
    .get('/test')
    .end((err, res) => {
      expect(err).to.not.eql(null);
      expect(res).to.have.status(404);
      expect(res.body).to.eql({message: 'Not found'});
      done();
    });
  });
});
