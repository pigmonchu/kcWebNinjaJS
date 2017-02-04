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

    //Login y SignUp
    $("button.signin").on("click", function(e) {
        window.location.href = "login.html";
    }); 

    $("button.signup").on("click", function(e) {
        window.location.href = "signup.html";
    }); 

    //Busqueda abrir
    $(".buttons-grp").on("click", "button.search",function(e){
        if($(".buttons-grp.active").length < 1) {
          $(e.delegateTarget).addClass("active");
        } else {
          $(e.delegateTarget).removeClass("active");
        }
    });

    $(".buttons-grp").on("keyup", ".input-search", function(e){
        if (e.which == 13) 
            alert("Busca");
    })



})