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

router.get("/userimages/:user", function(req, res, next) {
  console.log("/userimages/:username router")
  console.log(req.user.displayName);
   Images.findBy({user: req.user.displayName}, function (err,imgz) {
     if(err){ next(err);}
     if(!!imgz){ res.send("no record found"); }
     res.json(imgz);
   });
});

router.get('/logout', function(req, res){
    req.logout();
    res.json();
});

router.post("/newimage", function (req,res,next) {
  console.log("newimage router");
  var image = new Images(req.body);
  console.log(req.body);
  
  image.save(function (err,img) {
    if(err){ return next(err); }
    res.json(img);
  });
  
});

router.get("/userimages/:uname", function(req, res, next) {
  console.log("/userimages/:uname router");
  console.log(req.uname);
   Images.findBy({ user: req.uname},function(err, imgz) {
      if (err) {next(err) }
      res.json(imgz);
   }); 
});

module.exports = router;