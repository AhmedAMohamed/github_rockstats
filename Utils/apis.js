
var reserved_words = require('../Strings/reserved_words');
var secret_tokens  = require('../Strings/secrets');

var Api = function(api_name, params) {
    this.api_name = api_name;
    this.params = params;
    this.query = {};
    this.query.headers = {
        'User-Agent': 'Request-Promise'
    };
    this.query.qs = {
        client_id: "b47401ec6f6283b359cc"
        access_token: secret_tokens.github_api_token
    };
    this.query.json = true;
};

Api.prototype.create_query = function() {
    if (this.api_name == reserved_words.search_users) {
        this.query.uri = "https://api.github.com/search/users?" + "q=" + this.params[0] + "+" + this.params[1]+':%3E42';
        return this.query;
    }
    else {
        this.query.uri = this.params;
        return this.query;
    }
};

module.exports = Api;