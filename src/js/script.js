/* 	Feather-icons icon	 */
const feather = require('feather-icons')
feather.replace()

var isTablet
var isMobile

var scrlTop = 0

$(window).resize(() => {

	setEvents()

})

$(document).ready(() => {

	$('.selectpicker').selectpicker({
		style: 'btn-outline-info',
		noneResultsText: 'Результаты не найдены {0}',
		width: 'fit',
	})

	setEvents()

	$(window).scroll(() => {
		scrlTop = $(window).scrollTop()

		scrlPrlx()
		scrlLoad()
	})

})

function scrlLoad (k = 3) {
	const list = $('.js-scroll-load').prev('ul')
}

function scrlPrlx (k = 3) {
	$('.js-prlx').css('margin-top', (parseInt(scrlTop / k)) + 'px')
}

function setMediaQueryConst () {
	isTablet = (window.innerWidth < 992)
	isMobile = (window.innerWidth < 768)
}

function setEvents () {

	setMediaQueryConst()

	if (isTablet) {
		$('#asideNavbarToggle').on('click', () => {

			if (!$('#asideNavbar').hasClass('active'))
				$('#header .navbar-collapse').collapse('hide')

			$('#asideNavbar').toggleClass('active')
		})

		$(document).mouseup((event) => {

			if (!$(event.target).closest('#header').length) {
				$('#header .navbar-collapse').collapse('hide')
			}
			if (!$(event.target).closest('#asideNavbar, #asideNavbarToggle').length) {
				if ($('#asideNavbar').hasClass('active')) 
					$('#asideNavbar').removeClass('active')
			}
		})
	} 
	else {
		$('#header li.dropdown').hover(function () {

			$(this).addClass('show')
			.find('.dropdown-menu').addClass('show')
			.stop(true, true).delay(200).fadeIn(200);
		}, 
		function () {
			
			$(this).removeClass('show')
			.find('.dropdown-menu').removeClass('show')
			.stop(true, true).delay(200).fadeOut(200);
		})
	}
}
