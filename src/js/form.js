var $ = require('jquery');
var commentsService = require("./CommentsService");
var detailManager = require("./DetailManager");

$('.new-comment-form').on("submit", function(event) {
    var self = this;
	event.preventDefault();
 
    var inputs = $(this).find("input, textarea");
    for (var i=0; i<inputs.length; i++) {
        var input = inputs[i];
        if (input.checkValidity() === false) {
            alert("Campo " + input.name + ": " + input.validationMessage);
            $(input).focus();
            return false;
        } 
    }

    var textarea = $(this).find("#comentario");
    var comentario = textarea.val();
    var maxWords = textarea.data("maxwords");
    if (comentario.match(/\S+/g).length > maxWords) {
        alert("Campo comentario: No se permiten más de "+maxWords+" palabras");
        $(textarea).focus();
        return false;
    }

    var comment = {
        "nombre-completo": $("#nombre-completo").val(),
        email: $("#email").val(),
        comentario: $("#comentario").val()
    };

    $(this).find(".send-comment").text("Publicando...").attr("disabled", true);

    commentsService.save(comment, 
                    function(data) {
                        alert("Comentario guardado correctamente");
                        self.reset();
                        $(self).find("button").text("Publicando...").attr("disabled", false);
                        detailManager.loadComments();
                    }, 
                    function(error){
                        alert("Se ha producido un error")
                    });

    return false; //el formulario no se envía nunca
})