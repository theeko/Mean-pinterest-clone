var mongoose = require('mongoose');
var User = mongoose.model('User');
var Images = mongoose.model('Images');
var express = require('express');
var jwt = require('express-jwt');
var passport = require('passport')
var twitter = require('passport-twitter').Strategy;
var router = express.Router();
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'PintClone' });
});

router.get('/auth/twitter',
  passport.authenticate('twitter'));

router.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
});

router.get("/getuser", function(req, res, next) {
   res.json(req.user);
});

router.get('/logout', function(req, res){
    req.logout();
    res.json();
});

router.post("/newimage", function (req,res,next) {
  var image = new Images(req.body);
  console.log(req.body);
  
  image.save(function (err,img) {
    if(err){ return next(err); }
    res.json(img);
  });
  
});


module.exports = router;