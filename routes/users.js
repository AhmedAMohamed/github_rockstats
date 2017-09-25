var express = require('express');
var router = express.Router();

var request_promise = require('request-promise');
var slice = require('array-slice');
var Promise = require('promise');
var filter_obj = require('filter-obj');

var APIs = require('../Utils/apis');
var Helpers = require('../Utils/helpers');
var reserved_words = require('../Strings/reserved_words');

/* GET users listing. */
router.get('/', function(req, res, next) {
    var user_name = req.headers.search_name;
    var api = new APIs(reserved_words.search_users, [user_name, "repos"]);
    var query = api.create_query();
    request_promise(query)
    .then(function(results) {
        console.log("here");
        var users_data = slice(results.items, 0, 5);
        var users_usernames = users_data.map(function(user) {
            return filter_obj(user, ['login']);
        });
        var user_promises = users_usernames.map(function(username) {
            return Helpers.getUserInfos(username.login);
        });
        Promise.all(user_promises)
        .then(function(users_data) {
            users_data = users_data.map(function(user) {
                var filtered_user = filter_obj(user,
                    ['avatar_url', 'public_repos', 'public_gists', 'followers', 'following', 'bio', 'login', 'name']);
                return Helpers.calculateScore(filtered_user);
            });
            users_data.sort(function(a,b) {
                if (a.popularity_score > b.popularity_score) {
                    return -1;
                }
                else if (a.popularity_score < b.popularity_score) {
                    return 1;
                }
            });
            var response = {
                "valid" : true,
                "result": users_data
            };
            res.json(response)
        })
        .catch(function(err) {
            res.json("error 3");
        })
    })
    .catch(function(err) {
        console.log("error 2",err);
        res.json(err);
    })
});

module.exports = router;
