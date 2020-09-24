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
var User = mongoose.model('User', userSchema);

User.create({
  email: 'msoro@mohg.com',
  name: 'Mark Soro'
});

Post.create({
  title: 'Tips on how to cook the best pasta Part3!',
  content: 'Part 3 Underdone is better and water should be salted!'
}, function(err, post){
  if(err) {
    console.log(err);
  } else {
    User.findOne({email:'msoro@mohg.com'}, function(err, foundUser){
      if(err) {
        console.log(err);
      } else {
        foundUser.posts.push(post);
        foundUser.save(function(err, data){
          if(err) {
            console.log(err);
          } else {
            console.log(data);
          }
        });
      }
    });
  }
});

// Find user
// Find all post for that user
User.findOne({email:'msoro@mohg.com'}).populate('posts').exec(function(err, user){
  if(err){
    console.log(err);
  } else {
    console.log(user);
  }
});
