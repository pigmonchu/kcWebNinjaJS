var $ = require('jquery');

function compruebaOffsetTop() {
    if ($(window).width()>= 1024) return;
    
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
}


$().ready(function(){ 
    //Changing top menu by offset-top
    $(window).scroll(compruebaOffsetTop);

})