// getting-started.js
const mongoose = require('mongoose');
const userModel = mongoose.Schema({
    username: String,
    email: String,
    password: String
});
var user = mongoose.model('user', userModel);
module.exports = user;