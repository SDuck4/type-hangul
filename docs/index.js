$(function () {

    // Bulma - toggle navbar burger menu
    $('.navbar-burger').click(function () {
        $('.navbar-burger').toggleClass('is-active');
        $('.navbar-menu').toggleClass('is-active');
    });

    // #home-subtitle 타이핑 효과
    TypeHangul.type('#home-subtitle', '한글 타이핑 효과 라이브러리', {
        intervalType: 120,
        intervalChar: 60,
    });

});
