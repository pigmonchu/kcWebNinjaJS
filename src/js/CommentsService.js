var $ = require("jquery");

var API_URL = "/api/comments/";

var service = {

//recuperar todas las canciones
    list: function(successCallback, errorCallback) {
        alert("LLamo para la carga");
        $.ajax({
            type: "get",
            url: API_URL,
            success: function(data) {
                successCallback(data);
            },
            error: function(error) {
                errorCallback(error);
                console.error("Error al recuperar las canciones", error);
            }
        });
    },

//recuperar una sola canción
    get: function(commentId, successCallback, errorCallback) {
        $.ajax({
            type: "get",
            url: API_URL+songId,
            success: function(data) {
                successCallback(data);
            },
            error: function(error) {
                errorCallback(error);
                console.error("Error al recuperar las canciones", error);
            }
        });
    },

//guarda una canción
    save : function(song, successCallback, errorCallback) {
        $.ajax({
            type: "post",
            url: API_URL,
            data: song,
            success: function(data) {
                successCallback(data);
            },
            error: function(error) {
                errorCallback(error);
                console.error("Error al recuperar las canciones", error);
            }
        });
    },

//borrar una canción    
    delete: function(songId, successCallback, errorCallback) {
        $.ajax({
            type: "delete",
            url: API_URL+songId,
            success: function(data) {
                successCallback(data);
            },
            error: function(error) {
                errorCallback(error);
                console.error("Error al recuperar las canciones", error);
            }
        });
    }

}

module.exports = service;