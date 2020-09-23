var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog_demo', {
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
  posts:[postSchema]
});
var User = mongoose.model('User', userSchema);

// var newUser = new User({
//   email: 'jeffknight@knightgroup.com',
//   name: 'Jeff Knight'
// });
//
// newUser.posts.push({
//   title:'How to contribute to CFC in 3 easy steps!',
//   content: 'Visit cfc.com'
// });
//
// newUser.save(function(err, user){
//   if(err){
//     console.log(err);
//     console.log('You have an error');
//   } else {
//     console.log(user);
//   }
// });

// var newPost = new Post({
//   title: 'My experience learning programming',
//   content: 'Its great'
// });
//
// newPost.save(function(err, post){
//   if(err){
//     console.log(err);
//   } else {
//     console.log(post);
//   }
// });

User.findOne({name:'Jeff Knight'}, function(err, user){
  if(err){
    // console.log(err);
  } else {
    user.posts.push({
      title: 'What is CFC?',
      content: 'CFC stands for Combined Federal Campaign'
    });
    user.save(function(err, user){
      if(err){
        console.log(err);
      } else {
        console.log(user);
      }
    });
  }
});
