"use strict";

(function () {
  var mongoose = require("mongoose");

  var ImageSchema = new mongoose.Schema({
    title: {type: String, lowercase: true, unique: true },
    user: String,
    desc: String,
    url: String,
    upvoters: [String],
    votes: {type:Number, default:0 }
  });
  
  // ImageSchema.upvote = function (username, cb) {
  //   if(this.upvoters.indexOf(username) == -1){
  //     this.votes += 1;
  //     this.upvoters.push(username);
  //   } this.save(cb);
  // };
  
  mongoose.model('Images', ImageSchema);
})();
