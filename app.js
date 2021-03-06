const app        = require('express')()
const bodyParser = require('body-parser')
const mongoose   = require('mongoose')
const mongoDBUrl = 'mongodb://AhmadNizar:cBnmgEXaknFbpUNN@ahmadnizardb-shard-00-00-scdlc.mongodb.net:27017,ahmadnizardb-shard-00-01-scdlc.mongodb.net:27017,ahmadnizardb-shard-00-02-scdlc.mongodb.net:27017/drimerDB?ssl=true&replicaSet=AhmadNizarDB-shard-0&authSource=admin'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'html');

mongoose.connect(`${mongoDBUrl}`, (err) => {
  if(!err) {
    console.log('DATABASE TERHUBUNG');
  } else {
    console.log('TIDAK TERHUBUNG DATABASE',err);
  }
})

const index   = require('./routes/index')
const user    = require('./routes/user')
const history = require('./routes/history')

app.use('/',index)
app.use('/user',user)
app.use('/history', history)

app.listen((process.env.PORT || '3000'), () => {
	console.log('jalan port 3000 tong');
})

module.exports = app
