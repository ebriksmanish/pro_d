const express = require('express');
const router = express.Router();
const user = require('../models/schema');
const jwt = require('jsonwebtoken');
// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
});
// define the home page route
// router.get('/', function (req, res) {
//     res.send('Routes Started')
// });

router.post('/register',  (req, res) => {
    let value ={
        username : req.body.username,
        email : req.body.email,
        password : req.body.password
    };
    user.create(value)
    .then((success) => {return res.json(success)})
    .catch((unsuccess) => {return res.json(unsuccess)})
});

router.post('/login',  (req, res) => {
    let value ={
        email : req.body.email,
        password : req.body.password
    };
    user.findOne(value)
    .then((success) => {
        if(success == null) return res.json('error found')
        else{
            let myToken = jwt.sign({ id: user._id }, 'cert',  { expiresIn: 86400 });
            return res.json({success : success, token : myToken})
        } 
    })
    .catch((unsuccess) => {return res.json(unsuccess)})
});

// verify token
router.get('/verify',  (req, res) => {
    let myToken=  req.headers['x-access-token'];
    jwt.verify(myToken, 'cert', (err, data )=>{
        if(err) return res.json(err)
        return res.json(data) 

    })
});
module.exports = router