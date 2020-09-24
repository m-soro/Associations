var mongoose = require('mongoose');

// USER = email, name, and posts
var Schema = mongoose.Schema;
var userSchema = new Schema({
  email:String,
  name:String,
  posts:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }
  ]
});
module.exports = mongoose.model('User', userSchema);
