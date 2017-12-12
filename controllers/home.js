/**
 * GET /
 * Home page.
 */
var express = require('express');
var router = express.Router();
const path = require('path');
/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('home', { title: "Talent Home"});
//     res.render('home', {root: path.join(__dirname, '../views')});
});

module.exports = router;

