const express = require('express');
const app = express();
const userSchema = require('./routes/user');
const bodyParser = require('body-parser');
// getting-started.js
const mongoose = require('mongoose');
const config = require('./config/database');
const user = require('./models/schema');

mongoose.connect(config.database);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());




app.use('/', userSchema);

// app.get('/', function(req, res){
//   res.send('hello world');
// });

app.listen(3000, () => console.log('Example app listening on port 3000!'));