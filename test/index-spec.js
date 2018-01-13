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

describe('Login', () => {
  it('Post Email and Password', (done) => {
    chai.request(server)
    .post('/user/login')
    .send({
      'email':'coba@gmail.com',
      'password':'coba'
    })
    .end((err, res)=>{
      if(!err){
        res.body.should.be.an('object')
        res.status.should.equal(200)
        res.body.should.have.property('userToken')
        done()
      }
    })
  })
  it('Post Empty Email', (done) => {
    chai.request(server)
    .post('/user/login')
    .send({
      'email':'',
      'password':''
    })
    .end((err,res) => {
      res.body.should.be.an('object')
      res.status.should.equal(404)
      res.body.should.have.property('loginStatus')
      done()
    })
  })
  it('Post invalid Email', (done) => {
    chai.request(server)
    .post('/user/login')
    .send({
      'email': 'h@gmail.com',
      'password':'123123123123'
    })
    .end((err,res) => {
      res.body.should.be.an('object')
      res.status.should.equal(404)
      res.body.should.have.property('loginStatus')
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
        res.status.should.equal(500)
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
        res.status.should.equal(500)
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
        res.status.should.equal(500)
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
        res.status.should.equal(500)
      }else{
        res.status.should.equal(200)
      }
      done()
    })
  })
})

describe('History Test', ()=>{
  it('Get Data History from /history', function(done){
    chai.request(server)
    .get('/history')
    .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0xvZ2luIjp0cnVlLCJ1c2VyRGF0YSI6eyJfaWQiOiI1YTU4MzRhMzZmMDc5NDFjM2U5MzY2OTgiLCJuYW1lIjoiY2hhbmRyYSBQb2xpIiwiZW1haWwiOiJwb3BvQG1haWwuY29tIiwiYWdlIjoyNSwiZ2VuZGVyIjoibWFsZSIsInN1Z2VzdCI6bnVsbH0sImlhdCI6MTUxNTczMDEwMH0.SEi1a44IJYZLgrlWfvITgo-FClTbyFJlSAx3OuGwwvM')
    .end((err, res) => {
      res.body.should.be.an('array')
      res.body[0].should.have.property('userHistory')
      res.body[0].should.have.property('drinkWater')
      res.body[0].should.have.property('stepDay')
      res.body[0].should.have.property('dayWeather')
      res.body[0].should.have.property('createdAt')
      res.body[0].should.have.property('drinkTime')
      done()
    })
  })
  it('Post data to History from /history', (done)=>{
    chai.request(server)
    .post('/history')
    .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0xvZ2luIjp0cnVlLCJ1c2VyRGF0YSI6eyJfaWQiOiI1YTU4MzRhMzZmMDc5NDFjM2U5MzY2OTgiLCJuYW1lIjoiY2hhbmRyYSBQb2xpIiwiZW1haWwiOiJwb3BvQG1haWwuY29tIiwiYWdlIjoyNSwiZ2VuZGVyIjoibWFsZSIsInN1Z2VzdCI6bnVsbH0sImlhdCI6MTUxNTczMDEwMH0.SEi1a44IJYZLgrlWfvITgo-FClTbyFJlSAx3OuGwwvM')
    .send({
      'userHistory':'5a5834a36f07941c3e936698',
      'drinkWater':4,
      'stepDay':1234,
      'dayWeather':'Clouds',
      'createdAt': Date.now(),
      'drinkTime': []
    })
    .end((err, res) => {
      res.body.should.be.an('object')
      res.status.should.equal(200)
      res.body.should.have.property('drinkWater')
      res.body.should.have.property('stepDay')
      res.body.should.have.property('dayWeather')
      res.body.should.have.property('createdAt')
      res.body.should.have.property('drinkTime')
      done()
    })
  })
})

describe('Update user data', () => {
  it('Can update user data', (done) => {
    chai.request(server)
    .put('/user/edit/5a583e68b3f2d100100120c6')
    .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0xvZ2luIjp0cnVlLCJ1c2VyRGF0YSI6eyJfaWQiOiI1YTU4M2U2OGIzZjJkMTAwMTAwMTIwYzYiLCJuYW1lIjoiQW1lbGlhIFJhaG1hbiIsImVtYWlsIjoiYW1lbC5yYWhtYW41QGdtYWlsLmNvbSIsImFnZSI6MjQsImdlbmRlciI6IkZlbWFsZSJ9LCJpYXQiOjE1MTU4MjExNzV9.V0YGQ5-JQobYgSfbTAISIVcOxAqIb6XKmbvznaFiXto')
    .send({
      'name'  : 'Amel Ajah',
      'age'   : 30,
      'gender': 'Female',
    })
    .end((err, res) => {
      console.log(res.body)
      res.body.should.be.an('object')
      res.status.should.equal(200)
      done()
    })
  })
})
