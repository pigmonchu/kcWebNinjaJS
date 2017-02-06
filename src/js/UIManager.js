var $ = require('jquery');
var devicesJumps = require('./devicesJumps');
var detailManager = require('./DetailManager');

var UIManager = {
    headerSetTop: function() {
        if ($(window).width()>= devicesJumps.desktop) return;

        var header = $(".web-header");
        var navbar = $(".web-navbar");

        var h = header.height();
        var y = $(this).scrollTop();

        if (y-h <=0) {
            header.css({top: -y});
            navbar.css({top: h-y+1});
        } else {
            header.css({top: -h});
            navbar.css({top: 0});
        }    
    },

    navigate: function(event) {
        var href = event.target.dataset.href || event.delegateTarget.dataset.href;
    
        window.location.href = href;
    },

    searchToggle: function(event) {
        if ($(event.delegateTarget).hasClass("active")) {
          $(event.delegateTarget).removeClass("active");
        } else {
          $(event.delegateTarget).addClass("active");
        }
    },

    runSearch: function(event) {
        if (event.which == 13) {
            alert("Busca");
            $(event.target).val("");
            $(event.delegateTarget).removeClass("active"); //Aquí deberá invocar al servicio de búsqueda
        }

    },

    watchCommentsSection: function(){
        if (!this.offSetComments) {
            this.offSetComments = $("." + detailManager.defaultClass).offset().top;
        }
        var y = $(this).scrollTop();
        var h = $(this).height();

        if (y+h > this.offSetComments) {
            detailManager.commentsVisible();
        }
    }



};

module.exports = UIManager;

