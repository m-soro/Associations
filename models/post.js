var mongoose = require('mongoose');

// POST = title, content
var Schema = mongoose.Schema;
var postSchema = new Schema({
  title:String,
  content:String
});

module.exports = mongoose.model('Post', postSchema);
