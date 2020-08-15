$('a[data-target^=anchor]').click(function () {
	var el = $(this).attr('href');
	$('html, body').animate({
		scrollTop: $(el).offset().top
	}, 1000);
	return false;
});