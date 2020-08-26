
window.addEventListener('DOMContentLoaded', () => {
	@@include('jquery.js')
	@@include('jquery.waterwheelCarousel.min.js')
	@@include('magnific.js')
	@@include('carusel.js')
	@@include('menu.js')
	@@include('popup.js')
	@@include('slick.js')
	@@include('slick__rewiews.js')
	@@include('_services__card_link.js')


	let servicesCardLink = document.querySelectorAll('.js__services-card');//popup-link
	let formServicesTitle = document.querySelector('.form-services__title')//Children[1] form title
	let servicesCard = document.querySelector('#services__popup-services');//
	if (servicesCardLink.length > 0) {
		for (let index = 0; index < servicesCardLink.length; index++) {
			const linkBtn = servicesCardLink[index];
			linkBtn.addEventListener('click', changeTitle)
		}
	}

	function changeTitle() {
		let title = this.parentElement.children[1].innerHTML;//название массажа в секции
		let formTitle = document.querySelector('.js__form-services__title');//название массажа в форме
		let formSubject = document.querySelector('.js__form-services__subject');//скрытый заголовок который будет отправляться с формой
		formTitle.innerHTML = title;
		formSubject.value = title;
	}

});
