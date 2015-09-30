var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var userServices = require("../services/user-services");

var userSchema = new Schema({
    firstname: {type: String, required: "Please Enter Your Firstname"},
    lastname:  {type: String, required: "Please Enter Your Lastname" },
    username:  {type: String, required: "Please Enter Your Username" },
    password:  {type: String, required: "Please Enter Your Password" }
});


userSchema.path("username").validate(function(value, next) {
    userServices.findUser(value, function(err, user){
        if (err) {
            console.log(err);
            return next(false);   
        }
        next(!user);
    });
}, "That Username Already Exists!");


var User = mongoose.model("User", userSchema);
module.exports = {User: User};