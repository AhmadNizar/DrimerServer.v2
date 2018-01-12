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

// describe('History Test', ()=>{
//   it('Get Data History from /history', function(done){
//     chai.request(server)
//     .get('/history')
//     .end((err, res) => {
//       res.body.should.be.an('array')
//       done()
//     })
//   })
//   it('Post data to Histroty from /history', (done)=>{
//     chai.request(server)
//     .post('/history')
//     .send({
//       'userHistory':'5a5834a36f07941c3e936698',
//       'drinkWater':'2',
//       'stepDay':'1234',
//       'dayWeather':'Clouds',
//       'sugest': '2,1',
//       'createdAt': '0980',
//       'drinkTime': '098123908'
//     })
//     .end((err, res) => {
//       res.body.should.be.an('object')
//       res.status.should.equal(200)
//       res.body.should.have.property({userHistory})
//       res.body.should.have.property({drinkWater})
//       res.body.should.have.property({stepDay})
//       res.body.should.have.property({dayWeather})
//       res.body.should.have.property({sugest})
//       res.body.should.have.property({createdAt})
//       res.body.should.have.property({drinkTime})
//       done()
//     })
//   })
// })

// describe('User' , () => {
//   it ('Edit Data User from data record from /edit/:id' , (done) => {
//     chai.request(server)
//     .put('/user/edit/5a5834a36f07941c3e936698')
//     .send({
//       'email': 'popo@mail.com',
//       'password' : '1234567890',
//       'name':'testing1',
//       'age':'89',
//       'gender': 'Female',
//       'sugest':'2'
//     },{
//       headers : {
//         'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0xvZ2luIjp0cnVlLCJ1c2VyRGF0YSI6eyJfaWQiOiI1YTU4MzRhMzZmMDc5NDFjM2U5MzY2OTgiLCJuYW1lIjoiY2hhbmRyYSBQb2xpIiwiZW1haWwiOiJwb3BvQG1haWwuY29tIiwiYWdlIjoyNSwiZ2VuZGVyIjoibWFsZSIsInN1Z2VzdCI6bnVsbH0sImlhdCI6MTUxNTczMDEwMH0.SEi1a44IJYZLgrlWfvITgo-FClTbyFJlSAx3OuGwwvM'
//       }
//     })
//     .end((err, res) => {
//       res.body.should.equal(200)
//       done()
//     })
//   })
// })