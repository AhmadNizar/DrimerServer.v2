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

describe('Login testing', () => {
  it('Posting right email and password', (done) => {
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
  it('Posting an empty email', (done) => {
    chai.request(server)
    .post('/user/login')
    .send({
      'email':'',
      'password':''
    })
    .end((err,res) => {
      res.body.should.be.an('object')
      res.status.should.equal(404)
      res.body.should.have.property('loginStatus').eql('invalid')
      done()
    })
  })
  it('Posting an invalid email', (done) => {
    chai.request(server)
    .post('/user/login')
    .send({
      'email': 'h@gmail.com',
      'password':'123123123123'
    })
    .end((err,res) => {
      res.body.should.be.an('object')
      res.status.should.equal(404)
      res.body.should.have.property('loginStatus').eql('invalid')
      done()
    })
  })
  it('Posting an invalid password', (done) => {
    chai.request(server)
    .post('/user/login')
    .send({
      'email'   : 'coba@gmail.com',
      'password': 'jos'
    })
    .end((err, res) => {
      res.body.should.be.an('object')
      res.status.should.equal(404)
      res.body.should.have.property('loginStatus').eql('invalid')
      done()
    })
  })
  it('Posting an invalid email and password', (done) => {
    chai.request(server)
    .post('/user/login')
    .send({
      'email'   : 'jos@gmail.com',
      'password': 'jos'
    })
    .end((err, res) => {
      res.body.should.be.an('object')
      res.status.should.equal(404)
      res.body.should.have.property('loginStatus').eql('invalid')
      done()
    })
  })
})

describe('Register testing', () => {
  let userId = ''
  it('Register with right data', (done) => {
    chai.request(server)
    .post('/user/register')
    .send({
      'name'    : 'test',
      'password': 'test1',
      'email'   : 'tes7@gmail.com',
      'age'     : 20,
      'gender'  : 'Female'
    })
    .end((err ,res) => {
      if(!err){
        userId = res.body._id
        res.status.should.equal(200)
        res.body.should.be.an('object')
        res.body.should.have.property('name').eql('test')
        res.body.should.have.property('email').eql('tes7@gmail.com')
        res.body.should.have.property('age').eql(20)
        res.body.should.have.property('gender').eql('Female')
        done()
      }
    })
  })
  it('Register with invalid name', (done) => {
    chai.request(server)
    .post('/user/register')
    .send({
      'name':'test1',
      'password':'test1',
      'email': 'tessejuta@gmail.com',
      'age':30,
      'gender': 'Female'
    })
    .end((err, res) => {
      res.body.should.be.an('object')
      res.body.errors.name.should.have.property('message').eql('Invalid name format')
      res.status.should.equal(422)
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
      'age':30,
      'gender': 'Female'
    })
    .end((err, res) => {
      res.body.should.be.an('object')
      res.body.errors.email.should.have.property('message').eql('Invalid email address')
      res.status.should.equal(422)
      done()
    })
  })
  it('Register with invalid age', (done) => {
    chai.request(server)
    .post('/user/register')
    .send({
      'name'    : 'test',
      'password': 'test1',
      'email'   : 'tesorooooss@gmail.com',
      'age'     : 'a',
      'gender'  : 'Female'
    })
    .end((err, res) => {
      res.body.should.be.an('object')
      res.body.errors.age.should.have.property('message').eql('Cast to Number failed for value "a" at path "age"')
      res.status.should.equal(422)
      done()
    })
  })
  it('Register with invalid gender', (done) => {
    chai.request(server)
    .post('/user/register')
    .send({
      'name':'test1',
      'password':'test1',
      'email': 'tes100@gmail.com',
      'age':30,
      'gender': 'cewek'
    })
    .end((err, res) => {
      res.body.should.be.an('object')
      res.body.errors.gender.should.have.property('message').eql('`cewek` is not a valid enum value for path `gender`.')
      res.status.should.equal(422)
      done()
    })
  })
  it('Register with empty name', (done) => {
    chai.request(server)
    .post('/user/register')
    .send({
      'password': 'test1',
      'email'   : 'tes100@gmail.com',
      'age'     : 30,
      'gender'  : 'Female'
    })
    .end((err, res) => {
      res.body.should.be.an('object')
      res.body.errors.name.should.have.property('message').eql('Path `name` is required.')
      res.status.should.equal(422)
      done()
    })
  })
  it('Register with empty password', (done) => {
    chai.request(server)
    .post('/user/register')
    .send({
      'name'  : 'Ahmad Nizar',
      'email' : 'tes100@gmail.com',
      'age'   : 30,
      'gender': 'Female'
    })
    .end((err, res) => {
      res.body.should.be.an('object')
      res.status.should.equal(422)
      done()
    })
  })
  it('Register with empty email', (done) => {
    chai.request(server)
    .post('/user/register')
    .send({
      'name'    : 'Ahmad Nizar',
      'password': 'test1',
      'age'     : 30,
      'gender'  : 'Female'
    })
    .end((err, res) => {
      res.body.should.be.an('object')
      res.body.errors.email.should.have.property('message').eql('Email address is required')
      res.status.should.equal(422)
      done()
    })
  })
  it('Register with empty age', (done) => {
    chai.request(server)
    .post('/user/register')
    .send({
      'name'    : 'Ahmad Nizar',
      'password': 'test1',
      'email'   : 'ahmadnizar.owl@gmail.com',
      'gender'  : 'Female'
    })
    .end((err, res) => {
      res.body.should.be.an('object')
      res.body.errors.age.should.have.property('message').eql('Path `age` is required.')
      res.status.should.equal(422)
      done()
    })
  })
  it('Register with empty gender', (done) => {
    chai.request(server)
    .post('/user/register')
    .send({
      'name'    : 'Ahmad Nizar',
      'password': 'test1',
      'email'   : 'ahmadnizar.owl@gmail.com',
      'age'     : 30
    })
    .end((err, res) => {
      res.body.should.be.an('object')
      res.body.errors.gender.should.have.property('message').eql('Path `gender` is required.')
      res.status.should.equal(422)
      done()
    })
  })
  it('Delete user', (done) => {
    chai.request(server)
    .delete(`/user/delete/${userId}`)
    // .send({
    //   '_id' : '5a59d35c00958b17fb8b5e87'
    // })
    .end((err ,res) => {
      res.status.should.equal(200)
      done()
    })
  })
})

describe('History Test', () => {
  it('Get Data History from /history', (done) => {
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
  it('Get Data History from /history without token', (done) => {
    chai.request(server)
    .get('/history')
    .end((err, res) => {
      res.body.should.have.property('name').eql('JsonWebTokenError')
      res.body.should.have.property('message').eql('jwt must be provided')
      res.status.should.equal(401)
      done()
    })
  })
  it('Get Data History from /history with wrong token', (done) => {
    chai.request(server)
    .get('/history')
    .set('token', 'jos')
    .end((err, res) => {
      res.body.should.have.property('name').eql('JsonWebTokenError')
      res.body.should.have.property('message').eql('jwt malformed')
      res.status.should.equal(401)
      done()
    })
  })
  it('Get spesific user history by user id from /history/user', (done) => {
    chai.request(server)
    .get('/history/user')
    .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0xvZ2luIjp0cnVlLCJ1c2VyRGF0YSI6eyJfaWQiOiI1YTU4MzRhMzZmMDc5NDFjM2U5MzY2OTgiLCJuYW1lIjoiY2hhbmRyYSBQb2xpIiwiZW1haWwiOiJwb3BvQG1haWwuY29tIiwiYWdlIjoyNSwiZ2VuZGVyIjoibWFsZSIsInN1Z2VzdCI6bnVsbH0sImlhdCI6MTUxNTczMDEwMH0.SEi1a44IJYZLgrlWfvITgo-FClTbyFJlSAx3OuGwwvM')
    .end((err, res) => {
      res.body.should.be.an('array')
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
  it('Post data to History from /history without token', (done)=>{
    chai.request(server)
    .post('/history')
    .send({
      'drinkWater':4,
      'stepDay':1234,
      'dayWeather':'Clouds',
      'createdAt': Date.now(),
      'drinkTime': []
    })
    .end((err, res) => {
      res.body.should.have.property('name').eql('JsonWebTokenError')
      res.body.should.have.property('message').eql('jwt must be provided')
      res.status.should.equal(401)
      done()
    })
  })
  it('Post data to History from /history with wrong token', (done)=>{
    chai.request(server)
    .post('/history')
    .set('token', 'jos')
    .send({
      'drinkWater':4,
      'stepDay':1234,
      'dayWeather':'Clouds',
      'createdAt': Date.now(),
      'drinkTime': []
    })
    .end((err, res) => {
      res.body.should.have.property('name').eql('JsonWebTokenError')
      res.body.should.have.property('message').eql('jwt malformed')
      res.status.should.equal(401)
      done()
    })
  })
  it('Post invalid data to History',(done) =>{
    chai.request(server)
    .post('/history')
    .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0xvZ2luIjp0cnVlLCJ1c2VyRGF0YSI6eyJfaWQiOiI1YTU4MzRhMzZmMDc5NDFjM2U5MzY2OTgiLCJuYW1lIjoiY2hhbmRyYSBQb2xpIiwiZW1haWwiOiJwb3BvQG1haWwuY29tIiwiYWdlIjoyNSwiZ2VuZGVyIjoibWFsZSIsInN1Z2VzdCI6bnVsbH0sImlhdCI6MTUxNTczMDEwMH0.SEi1a44IJYZLgrlWfvITgo-FClTbyFJlSAx3OuGwwvM')
    .send({
      'drinkWater': 'chandra',
      'stepday': 'chandra',
      'dayWeather':'Clouds',
      'createdAt': Date.now(),
      'drinkTime':[]
    })
    .end((err ,res) => {
      res.status.should.equal(400)
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
      res.body.should.be.an('object')
      res.status.should.equal(201)
      res.body.should.have.property('name').eql('Amel Ajah')
      res.body.should.have.property('age').eql(30)
      res.body.should.have.property('gender').eql('Female')
      done()
    })
  })
  it('Update user data with wrong name data format', (done) => {
    chai.request(server)
    .put('/user/edit/5a583e68b3f2d100100120c6')
    .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0xvZ2luIjp0cnVlLCJ1c2VyRGF0YSI6eyJfaWQiOiI1YTU4M2U2OGIzZjJkMTAwMTAwMTIwYzYiLCJuYW1lIjoiQW1lbGlhIFJhaG1hbiIsImVtYWlsIjoiYW1lbC5yYWhtYW41QGdtYWlsLmNvbSIsImFnZSI6MjQsImdlbmRlciI6IkZlbWFsZSJ9LCJpYXQiOjE1MTU4MjExNzV9.V0YGQ5-JQobYgSfbTAISIVcOxAqIb6XKmbvznaFiXto')
    .send({
      'name'  : '123',
      'age'   : 30,
      'gender': 'Female',
    })
    .end((err, res) => {
      res.body.should.be.an('object')
      res.body.errors.name.should.have.property('message').eql('Invalid name format')
      res.status.should.equal(422)
      done()
    })
  })
  it('Update user data with wrong age data format', (done) => {
    chai.request(server)
    .put('/user/edit/5a583e68b3f2d100100120c6')
    .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0xvZ2luIjp0cnVlLCJ1c2VyRGF0YSI6eyJfaWQiOiI1YTU4M2U2OGIzZjJkMTAwMTAwMTIwYzYiLCJuYW1lIjoiQW1lbGlhIFJhaG1hbiIsImVtYWlsIjoiYW1lbC5yYWhtYW41QGdtYWlsLmNvbSIsImFnZSI6MjQsImdlbmRlciI6IkZlbWFsZSJ9LCJpYXQiOjE1MTU4MjExNzV9.V0YGQ5-JQobYgSfbTAISIVcOxAqIb6XKmbvznaFiXto')
    .send({
      'name'  : 'Ahmad Nizar',
      'age'   : 'a',
      'gender': 'Female',
    })
    .end((err, res) => {
      res.body.should.be.an('object')
      res.body.errors.age.should.have.property('message').eql('Cast to Number failed for value "a" at path "age"')
      res.status.should.equal(422)
      done()
    })
  })
  it('Update user data with wrong gender data format', (done) => {
    chai.request(server)
    .put('/user/edit/5a583e68b3f2d100100120c6')
    .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0xvZ2luIjp0cnVlLCJ1c2VyRGF0YSI6eyJfaWQiOiI1YTU4M2U2OGIzZjJkMTAwMTAwMTIwYzYiLCJuYW1lIjoiQW1lbGlhIFJhaG1hbiIsImVtYWlsIjoiYW1lbC5yYWhtYW41QGdtYWlsLmNvbSIsImFnZSI6MjQsImdlbmRlciI6IkZlbWFsZSJ9LCJpYXQiOjE1MTU4MjExNzV9.V0YGQ5-JQobYgSfbTAISIVcOxAqIb6XKmbvznaFiXto')
    .send({
      'name'  : 'Ahmad Nizar',
      'age'   : '21',
      'gender': 'cewek',
    })
    .end((err, res) => {
      res.body.should.be.an('object')
      res.body.errors.gender.should.have.property('message').eql('`cewek` is not a valid enum value for path `gender`.')
      res.status.should.equal(422)
      done()
    })
  })
  it('Update user data with wrong suggest data format', (done) => {
    chai.request(server)
    .put('/user/edit/5a583e68b3f2d100100120c6')
    .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0xvZ2luIjp0cnVlLCJ1c2VyRGF0YSI6eyJfaWQiOiI1YTU4M2U2OGIzZjJkMTAwMTAwMTIwYzYiLCJuYW1lIjoiQW1lbGlhIFJhaG1hbiIsImVtYWlsIjoiYW1lbC5yYWhtYW41QGdtYWlsLmNvbSIsImFnZSI6MjQsImdlbmRlciI6IkZlbWFsZSJ9LCJpYXQiOjE1MTU4MjExNzV9.V0YGQ5-JQobYgSfbTAISIVcOxAqIb6XKmbvznaFiXto')
    .send({
      'name'  : 'Ahmad Nizar',
      'age'   : '21',
      'gender': 'Male',
      'sugest': 'a'
    })
    .end((err, res) => {
      res.body.should.be.an('object')
      res.body.errors.sugest.should.have.property('message').eql('Cast to Number failed for value "a" at path "sugest"')
      res.status.should.equal(422)
      done()
    })
  })
  it('Update user data without token', (done) => {
    chai.request(server)
    .put('/user/edit/5a583e68b3f2d100100120c6')
    .send({
      'name'  : 'Amel Ajah',
      'age'   : 30,
      'gender': 'Female',
    })
    .end((err, res) => {
      res.body.should.have.property('name').eql('JsonWebTokenError')
      res.body.should.have.property('message').eql('jwt must be provided')
      res.status.should.equal(401)
      done()
    })
  })
  it('Update user data with wrong token', (done) => {
    chai.request(server)
    .put('/user/edit/5a583e68b3f2d100100120c6')
    .set('token', 'jos')
    .send({
      'name'  : 'Amel Ajah',
      'age'   : 30,
      'gender': 'Female',
    })
    .end((err, res) => {
      res.body.should.have.property('name').eql('JsonWebTokenError')
      res.body.should.have.property('message').eql('jwt malformed')
      res.status.should.equal(401)
      done()
    })
  })
})
