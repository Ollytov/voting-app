var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render("polls/success", {firstname: req.user ? req.user.firstname : null});   // Does Req.User exist? If so, set to firstname. If not, set to Null.
});


module.exports = router;
