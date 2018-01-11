var chai = require('chai')
var chaitHttp = require('chai-http')
var server = require('../app')
var should = chai.should()
chai.use(chaitHttp)

describe('App', () => {
  it('send back object', function (done){    
    this.timeout(10000)
    chai.request(server)    
    .get('/')
    .end((err,res) => {
      res.body.should.be.an('array')
      done()
    })
  })
})

describe('Register', () => {
  it('Register', (done) => {
    chai.request(server)
    .post('/user/register')
    .send({
      'name':'test1',
      'password':'test1',
      'email': 'tes@tees.com',
      'age':'test',
      'gender': 'test1'
    })
    .end((err ,res) => {
      if(!err){
        res.status.should.equal(200)
        res.body.should.be.an('object')
        done()
      }else{
        res.status.should.equal(400)
      }
      done()
    })
  })
  it('Register with invalid email', (done) => {
    chai.request(server)
    .post('/user/register')
    .send({
      'name':'test1',
      'password':'test1',
      'email': 'tes',
      'age':'test',
      'gender': 'test1'
    })
    .end((err, res) => {
      if(err){
        res.body.should.be.an('object')
        res.status.should.equal(400)
      }else{
        res.status.should.equal(200)
      }
      done()
    })
  })
  it('Register with invalid type data', (done) => {
    chai.request(server)
    .post('/user/register')
    .send({
      'name':'test1',
      'password':'test1',
      'email': 'tes@mail.com',
      'age':'test',
      'gender': 'test1'
    })
    .end((err, res) => {
      if(err){
        res.body.should.be.an('object')
        res.status.should.equal(400)
      }else{
        res.status.should.equal(200)
      }
      done()
    })
  })
  it('Register with invalid gender', (done) => {
    chai.request(server)
    .post('/user/register')
    .send({
      'name':'test1',
      'password':'test1',
      'email': 'tes@mail.com',
      'age':'23',
      'gender': 'cowok'
    })
    .end((err, res) => {
      if(err){        
        res.body.should.be.an('object')
        res.status.should.equal(400)
      }else{
        res.status.should.equal(200)
      }
      done()
    })
  })
})