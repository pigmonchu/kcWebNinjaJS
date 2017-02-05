var $ = require('jquery');
var keyLocalStorage = "dThinking.likes";

var service = {
    _likes : {},
    iniStorage: function() {
        localStorage.setItem(keyLocalStorage, JSON.stringify({}));
    },
    loadLikes: function(user_id) {
        var result = {};
        if (typeof(Storage) === "undefined") {
            this.iniStorage();
            return result;
        } else {
            this._likes = localStorage.getItem(keyLocalStorage) ? JSON.parse(localStorage.getItem(keyLocalStorage)) : {};
            return this._likes;
        }
    },

    loadLikeArticle: function(articleId, userId) {
        return this._likes[articleId];
    },

    addLikeArticle: function(articleId, userId) {
        this._likes[articleId]=true;
        localStorage.setItem(keyLocalStorage, JSON.stringify(this._likes));
        return;
    },

    removeLikeArticle: function(articleId, userId) {
        delete this._likes[articleId];
        localStorage.setItem(keyLocalStorage, JSON.stringify(this._likes));
        return;
    } 

};

module.exports = service;
