# Associations

## Intro to Associations
  * Define Associations
  * Discuss one:one, one:many and many:many relationships
    - We want this user and post to have a relationship. The way we do that is we embed the posts data to the userSchema.
    - So define the post schema and model first then embed it to the userSchema.
    - An example of one to many is a user with multiple posts like below!

## Embedding Data
  * User
  * Post

    ```
    var Schema = mongoose.Schema;
    var userSchema = new Schema({
      email:String,
      name:String,
      posts:[postSchema]
    });
    var User = mongoose.model('User', userSchema);

    var newUser = new User({
      email: 'jeffknight@knightgroup.com',
      name: 'Jeff Knight'
    });

    newUser.posts.push({
      title:'How to contribute to CFC in 3 easy steps!',
      content: 'Visit cfc.com'
    });

    newUser.save(function(err, user){
      if(err){
        console.log(err);
        console.log('You have an error');
      } else {
        console.log(user);
      }
    });
    ```

  - Let's add another post from user Jeff Knight

    ```
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
    ```

#### ...Another way of associating data using **object references**
  - Rather than, storing the actual posts in the posts array `posts:[postSchema]`, we will be storing object ids that references to the posts.

## Referencing Data
  - Will need to make a change in this line `posts:[postSchema]` to make this an array that we'll pass object ids in:
  ```
  posts:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }
  ]
  ```
  - above is the syntax writing for referencing mongoose object Id, referencing to a  post.

  - Now, Let's create a separate user and a separate post!
  ```
  User.create({
    email: 'msoro@mohg.com',
    name: 'Mark Soro'
  });

  Post.create({
    title: 'Tips on how to cook the best pasta!',
    content: 'Underdone is better and water should be salted!'
  }, function(err, post){
    if(err){
      console.log(err);
    } else{
      console.log(post);
    }
  });
  ```
  *But, how do we connect them together using the mongoose Id?*

  * Step 1 - create a post
  * Step 2 - find the user then in the callback function push the post that was just created to the foundUser posts[] array.
  * Step 3 - then we need to save the foundUser, then when thats done print out the data.

    ```
    Post.create({
      title: 'Tips on how to cook the best pasta Part2!',
      content: 'Underdone is better and water should be salted!'
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
    ```

*Tip*
* If there's only one referenced object in the array then you will see the entire object, but once 2 or more objects are referenced then you will see only their object id's.

*Let's say we'll need to find the user and we want to display that user's post*
```
User.findOne({email:'msoro@mohg.com'}).populate('posts').exec(function(err, user){
  if(err){
    console.log(err);
  } else {
    console.log(user);
  }
});
```

- `.populate` generates the posts.
- `.exec` executes the code.

* So first we stored the data as embedded in embed.js then we referenced it on reference.js but, when do we use what method?

The short answer is it depends!

* You can pretty much get away with both of them but, it really depends on what you are trying to do.
