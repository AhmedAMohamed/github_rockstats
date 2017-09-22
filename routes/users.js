var express = require('express');
var router = express.Router();


var APIs = require('../Utils/apis');
var reserved_words = require('../Strings/reserved_words');

/* GET users listing. */
router.get('/', function(req, res, next) {
    var user_name = req.headers.search_name;
    var api = new APIs(reserved_words.search_users, [user_name, "repos"]);
    var query_string = api.create_query();

    res.send('respond with a resource');
});

module.exports = router;
