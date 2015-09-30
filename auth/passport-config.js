module.exports = function() {
    var passport = require("passport");
    var passportLocal = require("passport-local");
    var userServices = require("../services/user-services");
    
    passport.use(new passportLocal(function(username, password, done) {
        userServices.findUser(username, function(err, user) {
            if (err) return done(err);
            if (!user || user.password !== password) return done(null, false);
            done(null, user);
        });
    }));
    
    passport.serializeUser(function(user, next) {
        next(null, user.username);
    });
    passport.deserializeUser(function(username, next) {
        userServices.findUser(username, function(err, user) {
           next(err, user);
        });
    });
};