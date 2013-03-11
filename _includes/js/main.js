$(function () {

    // Contact form

    var wWidth = $(window).width();
    var wHeight = $(window).height();

    var contactForm = $('<iframe src="https://docs.google.com/a/rootsandshootsgc.co.uk/spreadsheet/embeddedform?formkey=dDI0TEYzeHcxdE9iakNJYXYxZm1FeEE6MQ" width="' + (wWidth > 500 ? 500 : wWidth) + '" height="' + (wHeight > 550 ? 550 : wHeight) + '" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>');

    var contactContainer = $('.contact-inner');

    $('.contact-btn').on('click', function (e) {
        e.preventDefault();
        $('iframe', contactContainer).remove();
        contactContainer.prepend(contactForm).addClass('show');
    });

    $('.contact-close').on('click', function (e) {
        e.preventDefault();
        contactContainer.removeClass('show');
    });

    var loc = location.pathname.split("/");
    var last = loc[loc.length - 1];
    $(last == "" ? '#main-nav a:first' : '#main-nav a[href$="' + last + '"]').addClass('active');

});
