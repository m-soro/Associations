var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog_demo_2', {
  useNewUrlParser: true, useUnifiedTopology: true
});
// Define a Schema and a model

// POST = title, content
var Schema = mongoose.Schema;
var postSchema = new Schema({
  title:String,
  content:String
});
var Post = mongoose.model('Post', postSchema);

// USER = email, name
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
var User = mongoose.model('User', userSchema);
