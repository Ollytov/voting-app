var User = require("../models/user").User;
module.exports.addUser = function(user, next) {
  var newUser = new User({
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      password: user.password
  });  
  newUser.save(function(err) {
      if (err) return next(err);
      next(null);
  });
};

module.exports.findUser = function(username, next) {
    User.findOne({username: username}, function(err, user) {
       next(err, user); 
    });
};