
var reserved_words = require('../Strings/reserved_words');

var Api = function(api_name, params) {
    this.api_name = api_name;
    this.params = params;
    this.query = "";
};

Api.prototype.create_query = function() {
    if (this.api_name == reserved_words.search_users) {
        this.query = "https://api.github.com/search/users?" + "q=" + this.params[0] + "+" + params[1];
        return this.query;
    }
    else if (this.api_name == reserved_words.search_users) {
        return "not yet";
    }
};