var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog_demo_2', {
  useNewUrlParser: true, useUnifiedTopology: true
});

// using module.export
var Post = require('./models/post.js');
var User = require('./models/users.js');

User.create({
  email: 'msoro@mohg.com',
  name: 'Mark Soro'
});

Post.create({
  title: 'Tips on how to cook the best pasta Part4!',
  content: 'Part 4 Underdone is better and water should be salted!'
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
