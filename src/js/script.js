$(document).ready(function () {

	$('.header li.dropdown').hover(function() {
		$(this).addClass('show')
		.find('.dropdown-menu').addClass('show')
		.stop(true, true).delay(200).fadeIn(200);
	}, function() {
		$(this).removeClass('show')
		.find('.dropdown-menu').removeClass('show')
		.stop(true, true).delay(200).fadeOut(200);
	});
	
});
