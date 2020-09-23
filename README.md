# Associations

## Intro to Associations
  * Define Associations
  * Discuss one:one, one:many and many:many relationships
    - We want this user and post to have a relationship. The way we do that is we embed the posts data to the userSchema.
    - So define the post schema and model first then embed it to the userSchema.
    - An example of one to many is a user with multiple posts like below!
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

## Embedding Data
  * User
  * Post

## Referencing Data
