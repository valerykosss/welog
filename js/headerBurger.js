var burger = document.querySelector('.header__burger');
var menu = document.querySelector('.header__mobile-content');
var menuLinks = document.querySelectorAll('.nav__menu-item-mobile a');

burger.addEventListener('click', function() {
    burger.classList.toggle('active');
    menu.classList.toggle('active_header_block');
});

menuLinks.forEach(function(link) {
    link.addEventListener('click', function() {
        burger.classList.remove('active');
        menu.classList.remove('active_header_block');
    
    });
});