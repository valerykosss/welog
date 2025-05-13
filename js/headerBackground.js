$(document).ready(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.header').addClass('header_scrolled');
        } else {
            $('.header').removeClass('header_scrolled');
        }
    });
});