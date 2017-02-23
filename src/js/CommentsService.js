var $ = require("jquery");

var API_URL = "/api/comments/";

var service = {

//recuperar todas los comentarios
    list: function(successCallback, errorCallback) {
        $.ajax({
            type: "get",
            url: API_URL,
            success: function(data) {
                successCallback(data);
            },
            error: function(error) {
                errorCallback(error);
                console.error("Error al recuperar los comentarios", error);
            }
        });
    },

//recuperar un comentario
    get: function(commentId, successCallback, errorCallback) {
        $.ajax({
            type: "get",
            url: API_URL+commentId,
            success: function(data) {
                successCallback(data);
            },
            error: function(error) {
                errorCallback(error);
                console.error("Error al recuperar los comentarios", error);
            }
        });
    },

//guarda un comentario
    save : function(comment, successCallback, errorCallback) {
        $.ajax({
            type: "post",
            url: API_URL,
            data: comment,
            success: function(data) {
                successCallback(data);
            },
            error: function(error) {
                errorCallback(error);
                console.error("Error al recuperar los comentarios", error);
            }
        });
    },

//borrar un comentario    
    delete: function(commentId, successCallback, errorCallback) {
        $.ajax({
            type: "delete",
            url: API_URL+commentId,
            success: function(data) {
                successCallback(data);
            },
            error: function(error) {
                errorCallback(error);
                console.error("Error al recuperar los comentarios", error);
            }
        });
    }

}

module.exports = service;