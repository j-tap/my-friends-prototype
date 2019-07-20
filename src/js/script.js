/* 	Feather-icons icon	 */
const feather = require('feather-icons')

var isTablet
var isMobile

var scrlTop = 0

$(window).resize(() => {

	setEvents()

})

$(document).ready(() => {

	featherReplaceAndInit()
	initFormFields()
	setEvents()

	$(window).scroll(() => {
		scrlTop = $(window).scrollTop()

		scrlPrlx()
		scrlLoad()
	})

	tabsDefaultActive()

	$('.questionary-form').each(function () {
		new QuestionaryForm($(this))
	})
})

function QuestionaryForm (form) {
	this.curTab = 0
	this.$form = form
	this.$prog = this.$form.find('.progress-bar')
	this.$complete = this.$form.next('.questionary-complete')
	this.$tabs = this.$form.find('.nav-tabs').find('.nav-link')
	this.$votes = this.$form.find('.tab-pane').find('.form-group')
	this.cntTabs = this.$tabs.length

	this.$tabs.slice(1).attr('aria-disabled', true).addClass('disabled') // block all after first

	this.$votes.find('.custom-control-input').on('change', () => {
		if (this.curTab === this.$tabs.filter('.active').parent().index()) { // check active tab is current index
			this.next()
		}
		else {
			this.goCurIndex()
		}
	})

	this.next = function () {
		const percent = (this.curTab + 1) * (100 / this.cntTabs)
		this.$tabs.eq(this.curTab).addClass('complete')

		if (this.$tabs.eq(this.curTab + 1).length) {
			this.$tabs.eq(this.curTab + 1).removeAttr('aria-disabled').removeClass('disabled').tab('show')
			this.curTab++
		}
		else {
			this.$tabs.eq(this.curTab).removeClass('active')
			this.sendForm()
		}

		this.$prog.css('width', `${percent}%`)
	}

	this.goCurIndex = function () {
		this.$tabs.eq(this.curTab).tab('show')
	}

	this.sendForm = function () {
		this.$form.fadeOut(200, () => {
			this.$complete.fadeIn(200)
		})
	}
}

function tabsDefaultActive (){
	$('.nav-tabs').each(function () {
		if (!$(this).find('.nav-link.active').length) {
			$(this).children().first().children().addClass('active')
		}
	})
	$('.tab-content').each(function () {
		if (!$(this).children('.tab-pane.show.active').length) {
			$(this).children().first().addClass('active show')
		}
	})
}

function featherReplaceAndInit () {
	$('span.feather').each(function () {
		const icon = $(this).attr('class').replace('feather feather-', '')
		$(this).replaceWith('<i data-feather="'+icon+'"></i>')
	})
	feather.replace()
}

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

function initFormFields () {
	/* 
	* jQuery UI
	*/

	/* 
	* Select 
	* https://developer.snapappointments.com/bootstrap-select/
	*/
	const selectpickerDefault = {
		style: 'btn-outline-primary',
		// iconBase: 'feather',
		// tickIcon: 'feather-check',
		width: 'fit',
		selectedTextFormat: 'count > 1',
		countSelectedText: 'Выбрано {0}',
		noneSelectedText: 'Ничего не выбрано',
		noneResultsText: 'Результаты не найдены {0}',
	}
	Object.assign($.fn.selectpicker.Constructor.DEFAULTS, selectpickerDefault)
	$('select.selectpicker').selectpicker()

	/* 
	* Datetime 
	* https://eonasdan.github.io/bootstrap-datetimepicker/
	*/
	$('input.datetimepicker').datetimepicker({
		locale: 'ru',
		format: 'llll', //'D MMMM YYYY - k:mm'
		icons: {
			time: 'feather feather-clock',
            date: 'feather feather-calendar',
            up: 'feather feather-chevron-up',
            down: 'feather feather-chevron-down',
            previous: 'feather feather-chevron-left',
            next: 'feather feather-chevron-right',
            today: 'feather feather-crosshair',
            clear: 'feather feather-trash',
            close: 'feather feather-x'
		},
		minDate: new Date(),
		widgetPositioning: {
			horizontal: 'auto',
            vertical: 'top',
		},
		sideBySide: true,
		// debug: true,
	})
	.on('dp.show', function (e) {
		featherReplaceAndInit()
	})

	/* 
	* Tags 
	* https://github.com/underovsky/jquery-tagsinput-revisited
	* https://bootsnipp.com/snippets/exqd3
	*/
	$('.tagsinput-interests').each(function () {
		const items = $(this).data('items') || [];
		$(this).tagsInput({
			delimiter: [',',';','|','.'],
			autocomplete: {source: items},
			placeholder: 'Добавить увлечение',
			// unique: true,
			// minChars: 2,
			// validationPattern: new RegExp('^[a-zA-Z]+$'),
			// interactive: true,
			// maxChars: 20,
			// limit: 5,
			// validationPattern: new RegExp('^[a-zA-Z]+$'), // a pattern you can use to validate the input
			// width: '300px', // standard option is 'auto'
			// height: '100px', // standard option is 'auto'
			// hide: true,
			// removeWithBackspace: true,
			// onAddTag: callback_function,
			// onRemoveTag: callback_function,
			// onChange: callback_function,
		})
	})
}
