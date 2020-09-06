
//inspired by this CodePen by Sudhakar J: https://codepen.io/SudhakarJ/pen/vYENazW
$(function () {
    "use strict";
    
    $(".gallery img, .gallerysecond img").click(function () {
        var $src = $(this).attr("src");
        $(".show").fadeIn();
        $(".img-show img").attr("src", $src);
    });
    
    $("span, .overlay").click(function () {
        $(".show").fadeOut();
    });
    
});