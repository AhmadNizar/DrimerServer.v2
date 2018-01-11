const app = require('express')()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'html');

mongoose.connect('mongodb://AhmadNizar:cBnmgEXaknFbpUNN@ahmadnizardb-shard-00-00-scdlc.mongodb.net:27017,ahmadnizardb-shard-00-01-scdlc.mongodb.net:27017,ahmadnizardb-shard-00-02-scdlc.mongodb.net:27017/drimerDB?ssl=true&replicaSet=AhmadNizarDB-shard-0&authSource=admin', (err) => {
  if(!err) {
    console.log('DATABASE TERHUBUNG');
  } else {
    console.log('TIDAK TERHUBUNG DATABASE');
  }
})

const index = require('./routes/index')
const user = require('./routes/user')

app.use('/',index)
app.use('/user',user)

app.listen((process.env.PORT || '3000'), () => {
	console.log('jalan port 3000 tong');
})

module.exports = app
