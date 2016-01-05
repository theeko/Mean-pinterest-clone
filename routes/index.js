var mongoose = require('mongoose');
var User = mongoose.model('User');
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

router.get('/currentUser', function(req, res, next) {
    res.json(req.user);
});

module.exports = router;