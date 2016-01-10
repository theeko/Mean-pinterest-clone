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
  console.log(req.params.user);
  Images.find({user: req.params.user}, function (err,imgz) {
    if(err){ next(err);}
    res.json(imgz);
  });
});

router.put("/upvoteimg",function(req, res, next) {
  console.log("upvoteimg router");
  if(req.body.user == undefined){ res.send(" need to login for vote"); }
  Images.findOne({ _id: req.body.imid },function (err, img) {
    if(err){ next(err) }
    if(req.body.user == img.user){ res.send("cant upvote own img"); }
     else if(img.upvoters.indexOf(req.body.user) == -1){
      img.votes += 1;
      img.upvoters.push(req.body.user);
      img.save();
      res.send(img);
    } else { res.send("ok") }
  });
});

router.get('/logout', function(req, res){
    req.logout();
    res.json();
});

router.post("/newimage", function (req,res,next) {
  console.log("newimage router");
  if(req.body.user == undefined){
    console.log("need to loging for submitting img")
    res.send("need to loging for submitting img");
  } else {
    
  var image = new Images(req.body);
  
  image.save();
  res.json(image);
  }
  
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