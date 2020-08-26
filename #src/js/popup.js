const popupLinks = document.querySelectorAll('.popup__link'); //Присваем тем объектам которые должны открывать popup
const body = document.querySelectorAll('body'); //Забираем боди для работы над скролом при октрытии popup
let unlock = true; //Будет использоваться для избежания двойных нажатий
const timeout = 800;

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener('click', function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		})
	}
}


//Закрытие Popup

const popupCloseIcon = document.querySelectorAll('.popup__close');
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});

	}
}

//Открытие Popup
function popupOpen(curentPopup) {
	curentPopup.classList.add('open');
	curentPopup.addEventListener('click', function (e) {
		if (!e.target.closest('.popup__content')) {
			popupClose(e.target.closest('.popup'));
		}
	});
}

// popupClose
function popupClose(activePopup) {
	activePopup.classList.remove('open');
};

