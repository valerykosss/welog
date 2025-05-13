$(document).ready(function() {
    let isProgrammaticScroll = false;

    function smoothScrollTo(targetSelector, additionalOffset = 20) {
        const $target = $(targetSelector);
        if (!$target.length) {
            console.warn('Элемент не найден:', targetSelector);
            return false;
        }

        const headerHeight = $('.header').outerHeight() || 100;
        const scrollPosition = $target.offset().top - headerHeight - additionalOffset;

        isProgrammaticScroll = true;
        
        $('html, body').stop().animate({
            scrollTop: scrollPosition
        }, {
            duration: 800,
            easing: 'swing',
            complete: function() {
                history.replaceState(null, null, targetSelector);
                isProgrammaticScroll = false;
            }
        });

        return true;
    }

    function handleAnchorClick(e) {
        const target = $(this).attr('href');
        
        if (target && target.startsWith('#')) {
            e.preventDefault();
            smoothScrollTo(target);
        }
    }

    window.addEventListener('hashchange', function(e) {
        if (isProgrammaticScroll) {
            e.preventDefault();
        }
    }, false);

    function initSmoothScroll() {
        $('[href^="#"]').off('click').on('click', handleAnchorClick);
    }

    initSmoothScroll();
});