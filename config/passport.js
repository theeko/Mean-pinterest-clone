var passport = require('passport');
var twitterStrategy = require('passport-twitter').Strategy;
require('../models/Users');
require('dotenv').load();
var mongoose = require("mongoose");
var User = mongoose.model('User');

passport.use(new twitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: 'https://vast-thicket-9171.herokuapp.com/auth/twitter/callback'
  },
  function(token, tokenSecret, profile, cb) {
    User.findOne({username: profile.screen_name}, function(err, response) {
      if(err){ return; }
        if(!!response) {
            var newuser = new User();
            newuser.username = profile.screen_name;
            newuser.save();
        }
    });
    return cb(null, profile);
  }));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});