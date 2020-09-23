var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog_demo', {
  useNewUrlParser: true, useUnifiedTopology: true
});

// Define a Schema and a model
// USER = email, name
var Schema = mongoose.Schema;
var userSchema = new Schema({
  email:String,
  name:String
});
var User = mongoose.model('User', userSchema);

var newUser = new User({
  email: 'msoro@sorogroup.com',
  name: 'Mark Soro'
});

newUser.save(function(err, user){
  if(err){
    console.log(err);
    console.log('You have an error');
  } else {
    console.log(user);
  }
});


// POST = title, content
var Schema = mongoose.Schema;
var postSchema = new Schema({
  title:String,
  content:String
});
var Post = mongoose.model('Post', postSchema);

var newPost = new Post({
  title: 'My experience learning programming',
  content: 'Its great'
});

newPost.save(function(err, post){
  if(err){
    console.log(err);
  } else {
    console.log(post);
  }
});
