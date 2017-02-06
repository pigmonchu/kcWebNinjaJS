var $ = require('jquery');
var likesService = require("./LikesService");

var favBoton = "favorite-btn";
var favBotonOn = "favoriteOn-btn";
var selBoton = "."+favBoton;
var selBotonOn = "."+favBotonOn;

var selectorArticuloFin ="article.article[data-id=";

var likesManager = {
    activarLike: function(articleId) {
        var boton = $("article.article[data-id=" + articleId +"] " + selBoton);
        boton.removeClass(favBoton);
        boton.addClass(favBotonOn);
    },

    desactivarLike: function(articleId) {
        var boton = $("article.article[data-id=" + articleId +"] " + selBotonOn);
        boton.removeClass(favBotonOn);
        boton.addClass(favBoton);
    },

    activarLikesPantalla: function() {
        var articulosQueNosGustan = likesService.loadLikes();
        for (i=1; i<=10; i++) {
            if (articulosQueNosGustan[i]) {
                this.activarLike(i);
            }
        }
        
    },
    procesarLike: function(id) {
        if (likesService.loadLikeArticle(id)) {
            this.desactivarLike(id);
            likesService.removeLikeArticle(id);
            //Aquí debería actualizarse el contador.
        } else {
            this.activarLike(id);
            likesService.addLikeArticle(id);
            //Aquí debería actualizarse el contador.
        }
    },



};

module.exports = likesManager
