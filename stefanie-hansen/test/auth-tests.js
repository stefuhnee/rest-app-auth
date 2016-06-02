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

    let baseString = new Buffer('testusername:testpassword').toString('base64');
    let authString = 'Basic ' + baseString;
    let req = {
      headers:
      {
        authorization: authString
      }
    };

    getBasic(req, {}, () => {
      expect(req.auth).to.eql({username: 'testusername', password: 'testpassword'});
      
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
});
