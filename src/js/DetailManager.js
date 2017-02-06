var $ = require("jquery");
var commentsService = require("./CommentsService");

var defaultClass = "comments-list ";
var selector = $("."+defaultClass);
var UIStates = {
    _BLANK: "blank",
    _LOADING: "loading",
    _ERROR: "error",
    _IDEAL: "ideal"
};

var detailManager = {
    state: UIStates._BLANK,
    defaultClass: defaultClass,

    showState: function() {
        selector.removeClass().addClass(defaultClass + this.state);
    },
    
    setUIState: function(state) {
        this.state = state;
        this.showState();
    },

    commentsVisible: function() {
        if (this.state === UIStates._BLANK) {
            this.loadComments();
        }
    },

    renderComments: function(comments) {
        var html = "";
        for (var i in comments) {
            var comment = comments[i];
            html += '<article class="comment">';
            html += '<p><span class="nombre">' + comment["nombre-completo"] + '</span> (<span class="email">' + comment.email + '</span>)</p>'
            html += '<p class="comentario">' + comment.comentario + '</p>';
            html += '</article>';   
        }
        $(".comments-list .ui-ideal").html(html);

    },

    loadComments: function() {
        var self = this;

        self.setUIState(UIStates._LOADING);

        commentsService.list(
            function(comments){
                if (comments.length === 0) {
                    self.setUIState(UIStates._BLANK);
                } else {
                    self.renderComments(comments);
                    self.setUIState(UIStates._IDEAL);
                }
            }, function(error){
                self.setUIState(UIStates._ERROR);                
            }
        );
    },


}

module.exports = detailManager;