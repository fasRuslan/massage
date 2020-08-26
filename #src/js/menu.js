var width = window.innerWidth;


var nav = document.querySelector('.nav-js');
var toggle = document.querySelector('.toogle-js');
var link = document.querySelector('.nav-menu__link');

$('a[data-target^=anchor]').click(function () {
  var el = $(this).attr('href');
  $('html, body').animate({
    scrollTop: $(el).offset().top
  }, 1000);
  if (width < 768) {
    toggle.classList.remove('nav__toogle--open');
    toggle.classList.add('nav__toogle--close');
    nav.classList.add('nav-menu__list--close');
    nav.classList.remove('nav-menu__list--open');
  }
  return false;
});

toggle.addEventListener('click', function () {
	toggle.classList.toggle('nav__toogle--open');
	toggle.classList.toggle('nav__toogle--close');
	nav.classList.toggle('nav-menu__list--close');
	nav.classList.toggle('nav-menu__list--open');
});
