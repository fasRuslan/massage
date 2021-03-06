$(document).ready(function () {
	var carousel = $("#carousel").waterwheelCarousel({
		flankingItems: 3,
		movingToCenter: function ($item) {
			$('#callback-output').prepend('movingToCenter: ' + $item.attr('id') + '<br/>');
		},
		movedToCenter: function ($item) {
			$('#callback-output').prepend('movedToCenter: ' + $item.attr('id') + '<br/>');
		},
		movingFromCenter: function ($item) {
			$('#callback-output').prepend('movingFromCenter: ' + $item.attr('id') + '<br/>');
		},
		movedFromCenter: function ($item) {
			$('#callback-output').prepend('movedFromCenter: ' + $item.attr('id') + '<br/>');
		},
		clickedCenter: function ($item) {
			$('#callback-output').prepend('clickedCenter: ' + $item.attr('id') + '<br/>');
		}
	});

	$('#prev').bind('click', function () {
		carousel.prev();
		return false
	});

	$('#next').bind('click', function () {
		carousel.next();
		return false;
	});

	$('#reload').bind('click', function () {
		newOptions = eval("(" + $('#newoptions').val() + ")");
		carousel.reload(newOptions);
		return false;
	});

	$('#carousel, .slick-carousel').magnificPopup({
		delegate: '.show-popup',
		type: 'image',
		removalDelay: 500,
		gallery: {
			enabled: true,
		}
	});

	$('.slick-carousel').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: true,
		autoplay: true,
		dots: true,
		arrows: false,
		adaptiveHeight: true,
	})

});
