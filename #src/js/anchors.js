// $(function () {
// 	$('a[data-target^=anchor]').bind('click.smoothscroll', function () {
// 		let target = $(this).attr('href'),
// 			bl_top = $(target).offset().top;
// 		console.log(bl_top);
// 		$('body,  html').animate({
// 			scrollTop: bl_top
// 		}, 700);
// 		return false;
// 	})
// });
// $(function () {
// 	$('a[data-target^=anchor]').click(function () {
// 		var _href = $(this).attr("href");
// 		$("html").animate({ scrollTop: $(_href).offset().top + "px" });
// 		console.log(_href);
// 		console.log($(_href).offset().top);
// 		return false;
// 	});
// });
// $('a[data-target^=anchor]').on("click", function (e) {
// 	e.preventDefault();
// 	var anchor = $(this);
// 	$('html, body').stop().animate({
// 		scrollTop: ('700')
// 	});
// 	console.log(_href);
// 	console.log($(_href).offset().top);
// });
// Значение от начала страницы а мне нужно чтобы он брал отсчет от начала блока на котором я нахожусь