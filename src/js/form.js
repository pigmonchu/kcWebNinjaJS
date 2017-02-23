var $ = require('jquery');
var commentsService = require("./CommentsService");
var detailManager = require("./DetailManager");
var sanitizeHtml = require("sanitize-html");

$('.new-comment-form').on("submit", function(event) {
    var self = this;
	event.preventDefault();
 
 // Validación (habría que sacarla, pero no hoy)
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
        "nombre-completo": sanitizeHtml($("#nombre-completo").val()),
        email: sanitizeHtml($("#email").val()),
        comentario: sanitizeHtml($("#comentario").val())
    };

    $(this).find(".send-comment").text("Publicando...").attr("disabled", true);



    commentsService.save(comment, 
                    function(data) {
                        alert("Comentario guardado correctamente");
                        self.reset();
                        $(self).find("button").text("Publicar").attr("disabled", false);
                        detailManager.loadComments();
                    }, 
                    function(error){
                        alert("Se ha producido un error")
                    });

    return false; //el formulario no se envía nunca
})