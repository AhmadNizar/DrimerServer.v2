var chai = require('chai')
var chaitHttp = require('chai-http')
var server = require('../app')
var should = chai.should()
chai.use(chaitHttp)

describe('App', function () {
  it('send back object', function(done){    
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
    // this.timeout(10000)
    chai.request(server)
    .post('/user/login')
    .send({
      'email':'h@gmail.com',
      'password':'1234567'
    })
    .end((err, res)=>{
      if(!err){
        res.body.should.be.an('object')
        res.status.should.equal(200)
        res.body.should.have.property('userToken')
        done()
      }else{
        res.status.should.equal(404)
        done()
      }
    })    
  })
  it('Post invalid Email', (done) => {
    // this.timeout(1000)
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
    // this.timeout(1000)
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