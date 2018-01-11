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

describe('History Test', ()=>{
  it('Get Data History from /history', function(done){
    chai.request(server)
    .get('/history')
    .end((err, res) => {
      res.body.should.be.an('array')
      done()
    })
  })
  it('Post data to Histroty from /history', (done)=>{
    chai.request(server)
    .post('/history')
    .send({
      'userHistory':'',
      'drinkWater':'2',
      'stepDay':'1234',
      'dayWeather':'Clouds',
      'sugest': '2,1',
      'createdAt': '0980',
      'drinkTime': '098123908'
    })
    .end((err, res) => {
      res.body.should.be.an('object')
      res.status.should.equal(200)
      res.body.should.have.property('userHistory')
      res.body.should.have.property('drinkWater')
      res.body.should.have.property('stepDay')
      res.body.should.have.property('dayWeather')
      res.body.should.have.property('sugest')
      res.body.should.have.property('createdAt')
      res.body.should.have.property('drinkTime')
    })
  })
})