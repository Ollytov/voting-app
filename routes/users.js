var express = require('express');
var router = express.Router();
var passport = require("passport");
var userService = require("../services/user-services");

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
    if (req.user) {
        return res.redirect("/pollview");
    }
    res.render('account/login', {
        title: 'Log In',
        error: req.flash("error")
    });
});

router.get('/signup', function(req, res, next) {
    if (req.user) {
        return res.redirect("/pollview");
    }
    res.render('account/signup', {
        title: 'Create Account'
    });
});

router.post("/signup", function(req, res, next) {
    userService.addUser(req.body, function(err) {
        if (err) {
            console.log("Error!");
            var view = {
                title: "Create An Account",
                input: req.body,
                error: err
            }
            view.input.password = "";
            return res.render("account/signup", view);
        }
        res.redirect("/pollview");
    });
});

router.post("/login", passport.authenticate("local", {
    failureRedirect: "/users/login",
    successRedirect: "/pollview",
    failureFlash: "Invalid Credentials"
}));

router.get("/logout", function(req, res, next) {
    req.logout();
    res.redirect("/");
})

module.exports = router;