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
  Images.find({user: req.user.displayName}, function (err,imgz) {
    if(err){ next(err);}
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
  image.save();
  res.json(image);
  
});

router.delete("/deleteimg/:imgdata", function(req,res,next){
  Images.findOne({_id: req.params.imgdata}, function (err,img) {
    if(err){ next(err) }
    img.remove(function(err, resp){
      if(err){ next(err); }
      res.json(resp);
    });
  });
});

router.get("/allimages", function(req, res, next) {
   Images.find({}, function(err,imgs){
     if(err){ next(err) }
     res.json(imgs);
   }) 
});

module.exports = router;