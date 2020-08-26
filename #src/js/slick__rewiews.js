$('.slider').slick({
	centerMode: true,
	centerPadding: '60px',
	slidesToShow: 3,
	responsive: [
		{
			breakpoint: 990,
			settings: {
				arrows: false,
				centerMode: true,
				centerPadding: '60px',
				slidesToShow: 1
			}
		},
		{
			breakpoint: 480,
			settings: {
				arrows: false,
				centerMode: true,
				centerPadding: '40px',
				slidesToShow: 1
			}
		}
	]
});
