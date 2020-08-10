var width = window.innerWidth;


var nav = document.querySelector('.nav-js');
var toggle = document.querySelector('.toogle-js');

toggle.addEventListener('click', function () {
	toggle.classList.toggle('nav__toogle--open');
	toggle.classList.toggle('nav__toogle--close');
	nav.classList.toggle('nav-menu__list--close');
	nav.classList.toggle('nav-menu__list--open');
});
