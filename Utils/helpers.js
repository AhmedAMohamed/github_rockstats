var Octokit = require('octokit');

var helpers = {
    calculateScore : function(user) {
        var sum = user.public_repos + user.public_gists + user.followers + user.following;
        var score = (user.public_repos * 0.35 + user.public_gists * 0.30 + user.followers * 0.25 + user.following * 0.10)
        score /= 100;
        user.popularity_score = (score * 10).toFixed(3);
        return user;
    },
    getUserInfos : function(username) {
        var gh = Octokit.new({
            client_id: "b47401ec6f6283b359cc",
            client_secret: secret_tokens.github_api_token
        });
        var user = gh.getUser(username);
        return user.getInfo();
    }
};

module.exports = helpers;