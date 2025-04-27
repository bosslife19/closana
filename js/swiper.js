$(document).ready(function() {
	setTimeout(function () {
		document.querySelector('.wrapper').style.opacity = '1';
		document.querySelector('.preloader').style.display = 'none';
		// setCookie('preloader', 'shown', 365);
		// document.body.style.opacity = '1';
	}, 0);	
	
	let browser_language = navigator.language || navigator.userLanguage;
	let device = isMobile ? "mobile" : "desktop"
	const date = new Date()
	let initialTrafficSource = getCookie('initialTrafficSource')
	let utm_source = getUrlParameter('utm_source') || initialTrafficSource.split('utmcsr=')[1].split('|')[0]

	let utm_medium = initialTrafficSource.split('utmcmd=')[1].split('|')[0]
	if(getUrlParameter('utm_medium')) utm_medium = getUrlParameter('utm_medium')
	let first_utm_medium = utm_medium
	if(getCookie('first_utm_medium')) first_utm_medium = getCookie('first_utm_medium')

	let utm_campaign = initialTrafficSource.split('utmccn=')[1].split('|')[0]
	if(getUrlParameter('utm_campaign')) utm_campaign = getUrlParameter('utm_campaign')
	let first_utm_campaign = utm_campaign
	if(getCookie('first_utm_campaign')) first_utm_campaign= getCookie('first_utm_campaign')

	if(!getCookie('first_utm_medium')){
		setCookie('first_utm_medium', utm_medium, 365)
	}

	if(!getCookie('first_utm_campaign')){
		setCookie('first_utm_campaign', utm_campaign, 365)
	}

	addHiddenField('utm_source', utm_source)
	addHiddenField('utm_medium', first_utm_medium)
	addHiddenField('traffic_channel', utm_medium)
	addHiddenField('utm_term', getUrlParameter('utm_term'))
	addHiddenField('utm_campaign', first_utm_campaign)
	addHiddenField('utm_content', getUrlParameter('utm_content'))
	addHiddenField('language', browser_language)
	addHiddenField('page_path', document.location.pathname)
	addHiddenField('device_category', device)
	addHiddenField('date', date.toLocaleString())
	addHiddenField('first_visit_date', getCookie('first_visit_date'))
	addHiddenField('session_source', 'waveup.com')

	if(!getCookie('first_visit_date')){
		setCookie('first_visit_date', date.toLocaleString(), 365)
	}

	AOS.init();

	$.getJSON('https://ipapi.co/json/', function (data) {
		addHiddenField('country', data.country)
		addHiddenField('city', data.city)
		addHiddenField('ip', data.ip)
	});
});

function addHiddenField(key, value){
	if(!value) return
	$('form').not($('#searchform')).each(function(){
		$(this).append(`<input type="hidden" name="${key}" value="${value}">`);
	})
}

var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
    isMobile = true;
}


$(window).load(function() {
	$("input[name=name]").val(getCookie("name"));
	$("input[name=email]").val(getCookie("email"));
	$("input[name=phone]").val(getCookie("phone"));
});



// var lazyLoadInstance = new LazyLoad({
// 	// Your custom settings go here
// });

// PAGE CONTACT-US
let needs = '';

function checkNeeds(form) {
	needs = '';

	$(form).find('.contacts__form_need-inputs input:checked').each(function() {
		needs = needs + $(this).attr('name') + ', ';
		$(this).removeClass('error');
		$(this).addClass('not_error');
	});

	if(needs.length == 0) {
		$(form).find('.contacts__form_need-inputs input').addClass('error');
		$(form).find('.contacts__form_need-title .error__msg').fadeIn();
	} else {
		$(form).find('.contacts__form_need-inputs input').removeClass('error');
		$(form).find('.contacts__form_need-title .error__msg').fadeOut();

		needs = needs.slice(0, -2);
	}
}

$('.contacts__form_need-inputs input').on('change', function() {
	$(this).closest('.item').toggleClass('checked');
	let form = $(this).closest('form');

	checkNeeds(form);
})

$('form .subm').on('click', function(e){
  e.preventDefault();
  var form = $(this).closest('form');
  form.addClass('loading');
  setTimeout(function(){
    form.submit();
  }, 1000)
});

// const replyBuckets = ['B1', 'B2', 'B3', 'B4', 'B5'];

function validate(formid) {
	var output = false;
	var help = [];
	form = $(formid);
	form.addClass('loading');
	form.find('input[name="email"]').focus();

	if(form.find('textarea[name="project_info"]').length) {
		form.find('textarea[name="project_info"]').focus();
	}

	if(form.find('.item-requests input').length) {
		if(form.find('.item-requests input:checked').length == 0) {
			form.find('.item-requests .item__input').addClass('error');
		} else {
			form.find('.item-requests input:checked').each(function() {
				help.push($(this).val());
			});
		}
	}

	// contact-gift Block Template
	if(form.find('.item--gift .dropdown__list input').length) {
		if(form.find('.item--gift .dropdown__list input:checked').length == 0) {
			form.find('.item--gift .item__input').addClass('error');
		} else {
			form.find('.item--gift input:checked').each(function() {
				help.push($(this).val());
			});
		}
	}
	// end contact-gift Block Template

	form.find('button[type="submit"]').focus();
	let successText = form.find('.success__text');


	if($('.contacts__form_need').length) {
		checkNeeds(form);
	}

	formdata = {
		name: form.find('input[name="client_name"]').val(),
		email: form.find('input[name="email"]').val(),
		help: help.join(', '),
		project: form.find('input[name="project"]').val() || '',
		stage: form.find('input[name="stage"]').val() || '',
		budget: form.find('input[name="budget"]').val() || '',
		client_source: form.find('input[name="client_source"]').val() || '',
		project_info: form.find('textarea[name="project_info"]').val() || '',
		needs: needs,
		fund_website: form.find('input[name="fund_website"]').val() || '', //block partners-contact-v2
		investment_stages: form.find('input[name="investment_stages"]').val() || '', //block partners-contact-v2
		industry_focus: form.find('input[name="industry_focus"]').val() || '', //block partners-contact-v2
		investment_regions: form.find('input[name="investment_regions"]').val() || '', //block partners-contact-v2
		ticket_size: form.find('input[name="ticket_size"]').val() || '', //block partners-contact-v2
		mc_audience: form.find('input[name=mc_audience]').val() || '',
		reply_list: form.find('input[name=reply_list]').val() || '',
		formname: form.find('input[name=formname]').val() || '',
		ac_list: form.find('input[name=ac_list]').val() || '',
		packages_design: form.find('input[name=packages_design]').val() || '',
		country: form.find('input[name=country]').val() || '',
		city: form.find('input[name=city]').val() || '',
		trafic_chanel: form.find('input[name=trafic_chanel]').val() || '',
		language: form.find('input[name=language]').val() || '',
		page_path: form.find('input[name=page_path]').val() || '',
		device_category: form.find('input[name=device_category]').val() || '',
		date: form.find('input[name=date]').val() || '',
		utm_campaign: form.find('input[name=utm_campaign]').val() || '',
		utm_term: form.find('input[name=utm_term]').val() || '',
		utm_medium: form.find('input[name=utm_medium]').val() || '',
		utm_source: form.find('input[name=utm_source]').val() || '',
		first_visit_date: form.find('input[name=first_visit_date]').val() || '',
		session_source: form.find('input[name=session_source]').val() || '',
		traffic_channel: form.find('input[name=traffic_channel]').val() || ''
	}

	if(form.find('input[name="monday_id"]').length) {
		formdata.monday_id = form.find('input[name=monday_id]').val()
	}

	// console.dir(formdata);

	if ($(form).find('.not_error').length >= 1 && $(form).find('.error').length == 0){
		// if(formdata.formname == 'modalContactUs'){
		// 	$.ajax({
		// 		type: "POST",
		// 		url: 'https://dev.waveup.com/api/funds/replybucket',
		// 		async: false,
		// 		data: {
		// 			request: `${formdata.help} ${formdata.budget} ${formdata.country}`
		// 		},
		// 		success: function(resp) {
		// 			if(replyBuckets.includes(resp.bucket)){
		// 				formdata.reply_list = resp.bucket
		// 			} else {
		// 				formdata.reply_list = 'B5'
		// 			}
		// 		}
		// 	});
		// }
		
		$.ajax({
			type: "POST",
			url: 'https://waveup.com/export/',
			async: true,
			data: formdata,

		});
		setCookie('email', formdata.email, 365);
		setTimeout(function(){
			successText.css('opacity','1').css('display', 'block');
			form.removeClass('loading');
			form.find('input[name="email"]').val('');
			form.find('input[name="email"]').removeClass('not_error');

			if(form.find('textarea[name="project_info"]').length) {
				form.find('textarea[name="project_info"]').val('');
				form.find('textarea[name="project_info"]').removeClass('not_error');
			}

			if($('.contacts__form_need').length) {
				form.find('.item').removeClass('checked');
				form.find('.contacts__form_need-inputs input:checked').removeAttr('checked');
			}

			if(form.find('.item-requests').length) {
				form.find('.item-requests .dropdown__input').text('Select options');
				form.find('.item-requests .item__input').removeClass('not_error');
				form.find('.item-requests input:checked').removeAttr('checked');
			}

			if(form.find('input[name="budget"]').length) {
				form.find('input[name="budget"]').val('');
			}

			if(form.find('input[name="client_source"]').length) {
				form.find('input[name="client_source"]').val('');
			}

			// window.location.href = '';

		}, 1000)
	}
	else{
		form.find('input.error').first().focus();
		form.removeClass('loading');
	}
	return output;
};


// SMOOTH SCROLL //

$('a[href*="#"]')
	.not('[href="#"]')
	.not('[href="#0"]')
	.not('[href*="#modal"]')
	.click(function(event) {
		// On-page links
		$('.header').removeClass('active');
		if (
			location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
			&&
			location.hostname == this.hostname
		) {
			// Figure out element to scroll to
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			// Does a scroll target exist?
			if (target.length) {
				// Only prevent default if animation is actually gonna happen
				event.preventDefault();
				// var headerHeight = $('.header').height();
				var headerHeight =0;
				// if($(window).width() < 760){
				// 	headerHeight = 0;
				// }
				$('html, body').animate({
					scrollTop: target.offset().top - headerHeight
				},
				{
					// Set the duration long enough to allow time
					// to lazy load the elements.
					duration: 1500,
					// At each animation step, check whether the target has moved.
					step: function( now, fx ) {
					// Where is the target now located on the page?
					// i.e. its location will change as images etc. are lazy loaded
					var newOffset = target.offset().top - headerHeight;
					// If where we were originally planning to scroll to is not
					// the same as the new offset (newOffset) then change where
					// the animation is scrolling to (fx.end).
					if(fx.end !== newOffset)
						fx.end = newOffset;
					}
				})
			}
		}
});


$(document).ready(function(){
	var strings = [];
	$('.typewriter-texts li').each(function(){
		strings.push($(this).text());
	});
	if($('#typewriter').length > 0){
		const instance = new Typewriter('#typewriter', {
			strings: strings,
			autoStart: true,
			loop: true,
			delay: 50
		});
	}
})

var lastScrollTop = 0;
var serviceNavItemsOffset = 0;

let postEndOffset;


if($(window).width()>768) {
	var sidebarNav = document.getElementById('sidebar-nav');
	var headersAll = document.querySelectorAll('h2');
	const headers = Array.from(headersAll).slice(0, 4);

	if($('.sidebar').length > 0){
		headers.forEach(function(header) {
				// Перевірка, чи існує id у заголовка
				if (!header.id) {
						// Генерація id на основі тексту заголовка
						var id = header.textContent.toLowerCase().replace(/\s+/g, '-');
						header.id = id;
				}

				var listItem = document.createElement('li');
				var link = document.createElement('a');
				link.textContent = header.textContent;
				link.href = '#' + header.id;
				listItem.appendChild(link);
				sidebarNav.appendChild(listItem);
		});
	}

	var sidebarOffset;
	if($('.sidebar').length > 0) {
		 sidebarOffset = $('.sidebar').offset().top;
		//  postEndOffset = $('.simular-posts').offset().top - 68 - $('.sidebar').height();
		 postEndOffset = $('.simular-posts').offset().top - 68 - $('.sidebar').outerHeight(true);
			console.log( 'before'+ postEndOffset);
	}

	if(getCookie('close_header_tooltip')){
		$('.header__tooltip').addClass('closed');
	}

	$('.header__tooltip_close').on('click', function(e) {
		$('.header__tooltip').addClass('closed');
		setCookie('close_header_tooltip', true, 365)
	})

	$(window).scroll(function(event){
		 var sidebar = $('.sidebar');
		 var st = $(this).scrollTop();
		 $('.header__tooltip').addClass('closed');
		 let isPortfolioPage = $('body').hasClass('page-portfolio');
		 if(!getCookie('close_header_tooltip')) {
			setCookie('close_header_tooltip', true, 365);
		 }
		//  if (st > lastScrollTop){
		// 	 $('.header').addClass('scrolling_down');
		// 	 $('.header').removeClass('scrolling_up active');
		//  } else {
		// 	 $('.header').addClass('scrolling_up');
		// 	 $('.header').removeClass('scrolling_down');
		//  }
		//  lastScrollTop = st;

		 if (st > 0 && !isPortfolioPage) {
			$('.header').addClass('scrolling_up');
		 }


		 if(st == 0 && !isPortfolioPage){
			$('.header').removeClass('scrolling_up');
		 }


		if(sidebar.length > 0){


			var fromTop = window.scrollY ;

			if (fromTop >= sidebarOffset && fromTop < postEndOffset) {
					sidebar.removeClass('absolute').addClass('fixed');
			} else if (fromTop >= postEndOffset) {
					sidebar.removeClass('fixed').addClass('absolute');
			} else {
					sidebar.removeClass('fixed absolute');
			}



			headers.forEach(function(header) {
					var headerOffset = header.offsetTop;
					if (fromTop >= headerOffset) {
							// Видаліть клас "active" з усіх посилань
							sidebarNav.querySelectorAll('li a').forEach(function(link) {
									link.classList.remove('active');
							});

							// Додайте клас "active" до відповідного посилання
							var correspondingLink = sidebarNav.querySelector('a[href="#' + header.id + '"]');
							if (correspondingLink) {
									correspondingLink.classList.add('active');
							}
					}
			});
		}
	});
}




var cont_top;

$('.header__burger').on('click', function() {
	if(!$('.header').hasClass('active')) {
		$('.header').addClass('active');

		cont_top = window.pageYOffset ? window.pageYOffset : document.body.scrollTop;
		$('body').addClass('fixed').css('top', -cont_top);
	} else {
		$('.header').removeClass('active');
		$('body').removeClass('fixed').css('top', 0);
		window.scrollTo({
			top: cont_top,
		});

	}
});

if($('.header__banner').length > 0) {
	$('.breadcrumbs').css('margin-top', '60px');
}


$('.header__banner-close').on('click', () => {
	$('.header__banner').slideUp();
	$('.breadcrumbs').css('margin-top', '0');
	setCookie('header__banner', 'hide', 365);
})


$('.section__content_accordeon .item__header').on('click', function() {
	if($(this).closest('.item').hasClass('active')){
		$(this).closest('.item').removeClass('active')
	}
	else {
		$('.section__content_accordeon .item').removeClass('active');
		$(this).closest('.item').addClass('active');
	}
})


const simularPosts = new Swiper('.simular-posts__items', {
	spaceBetween: 40,
	loop: true,
	centeredSlides: true,
	slidesPerView: 1,
	breakpoints: {
		760: {
			slidesPerView: 2,
			centeredSlides: false,
		},
		1260: {
			centeredSlides: false,
			slidesPerView: 4,
		},
	},
	// pagination: {
	// 	el: ".swiper-pagination",
	// 	dynamicBullets: true,
	// },
	autoplay: {
		delay: 5000,
	},
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
});

$(document).ready(function() {
	const examplesSlider = new Swiper('.examples__slider', {
		spaceBetween: 20,
		// loop: true,
		centeredSlides: true,
		slidesPerView: 1,
		breakpoints: {
			760: {
				spaceBetween: 40,
			},
			1260: {
				spaceBetween: 120,
			},
		},
		pagination: {
			el: ".swiper-pagination",
			dynamicBullets: true,
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});
})

var casesliderThumbs = new Swiper(".caseslider__nav .swiper", {
	speed: 500,
	loop: true,
	spaceBetween: 0,
	slidesPerView: 'auto',
	watchSlidesVisibility: true,
	watchSlidesProgress: true,
	allowTouchMove: true,
	slideToClickedSlide: true,
	centeredSlides: true,
	breakpoints: {
		760: {
			slideToClickedSlide: true,
			allowTouchMove: false,
			slidesPerView: 'auto',
		},
	},
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	pagination: {
		el: ".swiper-pagination",
		dynamicBullets: true,
	},
});

var casesliderContent = new Swiper(".caseslider__main", {
	speed: 500,
	loop: true,
	effect: 'fade',
	allowTouchMove: false,
	slidesPerView: 1,
	thumbs: {
		swiper: casesliderThumbs,
	},

	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	on: {
		slideChangeTransitionStart: function () {
			$('.aos').removeClass('aos-init').removeClass('aos-animate');
			// $('.case__uptitle, .case__title, .case__subtitle, .case__link').hide(0);
		},
		slideChangeTransitionEnd: function () {
			// $('.case__uptitle, .case__title, .case__subtitle, .case__link').show(0);
			AOS.init();
		},
	}
});

// casesliderContent.controller.control = casesliderThumbs;
// casesliderThumbs.controller.control = casesliderContent;

function getCurrentIndex(swiper) {
	// Apparently the `realIndex` property might be a string?
	return swiper.realIndex|0;
}

function getTotalSlides(swiper) {
	// Looped carousels include leading/lagging slides which buffs the length of this array
	return swiper.slides.length - (swiper.params.loop ? 2 : 0);
}

function changeSlide(swiper, index) {
	const currentIndex = getCurrentIndex(swiper);
	const total = getTotalSlides(swiper);

	// Only change the slide if the new index is different to the current
	// This is important if two carousels are controlling each other, as without this check the program will go into an infinite loop and overflow the stack
	if (currentIndex !== index) {
		// If the carousel loops around, then we want to ensure it truly does loop - simply using the `slideTo` method doesn't actually account for looping
		// The idea is to check if the new index is directly before or after the current, and if so, use the `slidePrev`/`slideNext` methods that *do* account for looping
		if (swiper.params.loop) {
			if ((index === 0 && currentIndex === total - 1) || index === currentIndex + 1) {
				swiper.slideNext();
			} else if ((index === total - 1 && currentIndex === 0) || index === currentIndex - 1) {
				swiper.slidePrev();
			} else {
				// Need to buffer the index to account for the leading/lagging slides
				swiper.slideTo(index + 1);
			}
		} else {
			swiper.slideTo(index);
		}
	}
}

function controlSwiper(controller, target) {
	// Listens for a `transitionStart` event, as none of the other slide changing events seemed to trigger at all
	controller.on('transitionStart', function() {
		const index = getCurrentIndex(controller);
		changeSlide(target, index);
	});
}

if($(window).width() < 760) {
	controlSwiper(casesliderContent, casesliderThumbs);
	controlSwiper(casesliderThumbs, casesliderContent);
}






jQuery(function ($) {
		"use strict";

		var counterUp = window.counterUp["default"]; // import counterUp from "counterup2"

		var $counters = $(".counter");

		/* Start counting, do this on DOM ready or with Waypoints. */
	$counters.each(function (ignore, counter) {
		var waypoint = new Waypoint( {
			element: $(this),
			handler: function() {
				counterUp(counter, {
					duration: 3000,
					delay: 16
				});
				this.destroy();
			},
			offset: 'bottom-in-view',
		} );
	});

});


const thumbs = $('.gallery__thumbs');
const slider = $('.gallery__slider');
for( i=0; i< thumbs.length; i++ ) {
	thumbs[i].classList.add('gallery__thumbs-' + i);
	slider[i].classList.add('gallery__slider-' + i);
	slider[i].closest('.gallery').querySelector('.swiper-button-prev').classList.add('swiper-button-prev-' + i);
	slider[i].closest('.gallery').querySelector('.swiper-button-next').classList.add('swiper-button-next-' + i);

	var galleryThumbs = new Swiper('.gallery__thumbs-' + i, {
		slidesPerView: 3,
		spaceBetween:10,
		watchSlidesProgress: true,
		centeredSlides: true,
		breakpoints: {
			760: {
				slidesPerView: 5,
			},
			1200: {
				slidesPerView: 10,
			},
		},
	});

	var gallerySlider = new Swiper('.gallery__slider-' +i, {
		spaceBetween: 10,
		mousewheel: {
			releaseOnEdges: true,
		},
		// noSwiping: true,
		// noSwipingClass: 'swiper-slide',
		keyboard: {
			enabled: true,
			onlyInViewport: false,
		},
		navigation: {
			nextEl: ".swiper-button-next-"+i,
			prevEl: ".swiper-button-prev-"+i,
		},
		thumbs: {
			swiper: galleryThumbs,
		},
	});

	gallerySlider.controller.control = galleryThumbs
}

if($('body').hasClass('blog')||$('body').hasClass('archive')||$('body').hasClass('search')&&$(window).width()>=1200){
	$('.blog__posts').masonry({
		// options...
		itemSelector: '.grid-item',
		columnWidth: 400
	});
}

$(document).ready(function(){
	if($(window).width()>760) {
		$('.tabs .tab').first().addClass('active');
		let tabsHeight = $('.tabs').find('.tab.active').find('.tab__content').height();
		$('.tabs__wrap').css('height', tabsHeight+'px');
	}

})


$('.tabs .tab__header').on('click', function() {
	let tabs = $(this).closest('.tabs');
	tabs.find('.tab.active').removeClass('active');
	$(this).closest('.tab').addClass('active');
	if($(window).width()>760) {
		let tabsHeight = tabs.find('.tab.active').find('.tab__content').height();
		tabs.find('.tabs__wrap').css('height', tabsHeight+'px');
	}

})


$('.stages .card').on('click', function() {
	const tab = $(this).data('tab');
	$('.stages .card, .stages .tab').removeClass('active');
	$(this).addClass('active');
	$(`.stages .tab--${tab}`).addClass('active');
})

$('.calc .block__range_input').on('change', function() {
	var slides = $(this).val();
	$('.calc .block__input').val(slides);
	var slidePrice = 110 - slides;
	var price = slides*slidePrice + 750;
	$('.calc .block__pay').text(`$${price.toLocaleString()}`)
})

$('.calc .block__input').focusout(function() {
	var slides = $(this).val();
	slides = Math.min(Math.max(slides, 10), 60);
	$('.calc .block__range_input, .calc .block__input').val(slides);
	var slidePrice = 110 - slides;
	var price = slides*slidePrice + 750;
	$('.calc .block__pay').text(`$${price.toLocaleString()}`)
	$('.calc .block__pay').removeClass('calculating');
});

$('.calc .block__input').focusin(function() {
	$('.calc .block__pay').addClass('calculating');
})


if($(window).width()>1200) {
	$('.blog__categories_block').mouseenter(function() {
		$(this).addClass('active');
	})

	$('.blog__categories_block').mouseleave(function() {
		$(this).removeClass('active');
	})
} else {
	$('.blog__categories_title').on('click', () => {
		$('.blog__categories_block').toggleClass('active');
	})
}



const clientsSlider1 = new Swiper('.clients__slider--1', {
	loop: true,
	speed: 10000,
	slidesPerView:3,
	autoplay: {
		delay: 0,
		disableOnInteraction: false
	},
	breakpoints: {
		760: {
			slidesPerView: 5,
		},
		1260: {
			slidesPerView: 8,
		},
	},
 });

const clientsSlider2 = new Swiper('.clients__slider--2', {
	loop: true,
	speed: 10000,
	slidesPerView:3,
	autoplay: {
		delay: 0,
		disableOnInteraction: false,
		reverseDirection: true,
	},
	breakpoints: {
		760: {
			slidesPerView: 5,
		},
		1260: {
			slidesPerView: 8,
		},
	},
 });


// header menu
if($(window).width() > 993) {
	$('.header__menu>li.menu-item-has-children')
		.on( "mouseenter", function() {
			$(this).find('.first_level_menu>ul>li.menu-item:first').addClass('active');
			$(this).addClass('active');
		} )
		.on( "mouseleave", function() {
			$(this).find('.first_level_menu>ul>li.menu-item:first').removeClass('active');
			$(this).removeClass('active');
		} )

	$('.header__menu .first_level_menu>ul>li').hover(function() {
		if(!$(this).is(':first')) {
			$(this).parents('li').find('.first_level_menu>ul>li.menu-item:first').removeClass('active');
			$(this).toggleClass('active');
		}
	})
	$('.header__menu .first_level_menu>ul>li li').hover(function() {
		$(this).toggleClass('active');
	})
} else {
	$('.header__menu li').click(function(e) {
		e.stopPropagation();
		$(this).toggleClass('active');
	})
}

if($('.modal-v2-overlay').length) {
	setTimeout(function() {
		$('.modal-v2-overlay').css('display', 'flex');
	}, 60000)

	$('.modal-v2__btn--1').on('click', function() {
		$(this).closest('.modal-overlay').find('.modal-v2__form').fadeIn();
		$(this).css('display', 'none');
	})

	$('.modal-v2__btn--2').on('click', function() {
		$(this).closest('.modal-overlay').fadeOut();
	})
}

// автоматичне збільшення висоти textarea
function auto_grow(element) {
	element.style.height = "45px";
	element.style.height = (element.scrollHeight) + "px";
}


if($('.industry-tabs').length) {
	$('.industry-tabs__nav_link').first().addClass('active');
	$('.industry-tabs .tab').first().addClass('active');

	$('.industry-tabs__nav_link').on('click', function() {
		const tab = $(this).data('tab');
		$('.industry-tabs__nav_link, .industry-tabs .tab').removeClass('active');
		$(this).addClass('active');
		$(`.industry-tabs .tab--${tab}`).addClass('active');
	});

	$('.industry-tabs__btn').on('click', function(e) {
		e.preventDefault();
		$('.industry-tabs__nav').addClass('active');
		$(this).hide();
	});
}

//block partners
if($('.partners__items').length > 0) {
	$('.partners__items').each(function () {
		if($(this).find('.item').length > 6 && !$(this).hasClass('_show-all')) {
			$(this).closest('.partners').addClass('_show-more');
			$(this).closest('.partners').on('click', function(e) {
				$(this).removeClass('_show-more');
			})
		}
	})
}


if($('.bubble-parent').length) {
	if($(window).width() > 993) {
		$('.bubble-icon').on( "mouseenter", function() {
			$(this).parent().addClass('_active');
		} ).on( "mouseleave", function() {
			$(this).parent().removeClass('_active');
		} )
	} else {
		$('.bubble-icon').on( "click", function() {
			$(this).parent().toggleClass('_active');
		} )
	}
}

if($(window).width() < 993) {
	$('.modal-contact-us .close-button, .modal-contact-us.modal-overlay').on("click",function(){
		if($('.header').hasClass('active')) {
			setTimeout(()=> {
				$('body').addClass('fixed').css('top', -cont_top);
			}, 0);
		}
	});
}


let pageY;
$('.workexamples .item__image, .workexamples-v2 .item__image').on('click', () => {
	pageY = window.pageYOffset ? window.pageYOffset : document.body.scrollTop;

	$('body').css({'position': 'fixed', 'top': - pageY+'px', 'width': '100%'});
})

$('.modal-gallery .close-button, .modal-gallery.modal-overlay').on("click", () => {
	$('body').css({'position': 'relative', 'top': 0});

	window.scrollTo({
		top: pageY,
	});
});

$(document).ready(function(){

	if($('.tailored-list').length) {
			// Function to create fund element
			function createFundElement(fundData) {
				const fundElement = document.createElement("div");
				fundElement.classList.add("fund");

				// Create header
				const header = document.createElement("div");
				header.classList.add("fund-header");
				header.innerHTML = `
					<div class="fund__logo" style="background-image: url('https://hub.waveup.com/api/files/${fundData.logo}')"></div>
					<div class="fund__name">${fundData.name}</div>
				`;
				fundElement.appendChild(header);

				// Create body
				const body = document.createElement("div");
				body.classList.add("fund-body");
				body.innerHTML = `
					<div class="fund__investments">
						<b>${fundData.totalInvestmentsCount}</b> investments
					</div>
				`;

				if(fundData.industryFocus.length) {
					const focus = document.createElement('div');
					focus.classList.add('fund-info');
					focus.innerHTML = `
						<div class="fund-info__title">Focus:</div>
						<ul class="fund-info__items">
							${fundData.industryFocus.map(item => `<li>${item}</li>`).slice(0,2).join('')}
							${fundData.industryFocus.length > 2 ? `<li>+${fundData.industryFocus.length - 2}</li>` : '' }
						</ul>
					`;
					body.appendChild(focus);
				}

				if(fundData.roundFocus.length) {
					const stage = document.createElement('div');
					stage.classList.add('fund-info');
					stage.innerHTML = `
						<div class="fund-info__title">Stage:</div>
						<ul class="fund-info__items">
							${fundData.roundFocus.map(item => `<li>${item}</li>`).slice(0,2).join('')}
							${fundData.roundFocus.length > 2 ? `<li>+${fundData.roundFocus.length - 2}</li>` : '' }
						</ul>
					`;
					body.appendChild(stage);
				}

				if(fundData.averageCheck.length) {
					const check = document.createElement('div');
					check.classList.add('fund-info');
					check.innerHTML = `
						<div class="fund-info__title">Check:</div>
						<ul class="fund-info__items">
							${fundData.averageCheck.map(item => `<li>${item}</li>`).slice(0,2).join('')}
							${fundData.averageCheck.length > 2 ? `<li>+${fundData.averageCheck.length - 2}</li>` : '' }
						</ul>
					`;
					body.appendChild(check);
				}

				fundElement.appendChild(body);

				// Create footer
				const footer = document.createElement("div");
				footer.classList.add("fund-footer");
				footer.innerHTML = `
					<div class="fund-footer__text"><b>Fund profile:</b> Detailed stats</div>
					<a href="https://hub.waveup.com/funds/${fundData.slug}" class="fund-footer__button">View VC firm</a>
				`;
				fundElement.appendChild(footer);

				return fundElement;
			}

			// $('.tailored-list').each(function(){
			// 	let listSlug = $(this).data('list');
			// 	let title = $(this).find('.tailored-list__title');
			// 	let container = $(this).find('.tailored-list__funds');
			// 	let apiUrl = `https://hub.waveup.com/api/lists/${listSlug}?isTemplate=true&select=name%20slug%20funds&fundsSelect=name%20slug%20logo%20totalInvestmentsCount%20roundFocus%20averageCheck%20industryFocus%20investments`;
			// 	console.log(apiUrl)
			// 	fetch(apiUrl)
			// 		.then(response => {
			// 			// Check if the response is successful (status code 200)
			// 			if (!response.ok) {
			// 				throw new Error('Network response was not ok');
			// 			}
			// 			// Parse the JSON data in the response
			// 			return response.json();
			// 		})
			// 		.then(data => {
			// 			// Do something with the data retrieved from the API
			// 			const list_name = data.list.name;
			// 			if(title.text().length == 0) {
			// 				title.text(list_name);
			// 			}
			// 			const funds = data.list.funds;
			// 			funds.forEach(fund => {
			// 				const fundElement = createFundElement(fund);
			// 				container.append(fundElement);
			// 			});
			// 			postEndOffset = postEndOffset + $('.tailored-list').outerHeight(true);
			// 		})
			// 		.catch(error => {
			// 			// Handle any errors that occur during the fetch operation
			// 			console.error('There was a problem with the fetch operation:', error);
			// 		});
			// })

			$('.tailored-list__button-more').on('click', function() {
				$(this).closest('.tailored-list').addClass('active');
			})
	}


})

if($('form .item-requests .dropdown').length > 0) {
	function getSelectedRequests(form) {
		let dropdownInput = form.querySelector('.item-requests .dropdown__input');
		let selectedRequests = Array.from(form.querySelectorAll('.item-requests input[name="requests"]:checked'))
			.map(checkbox => checkbox.getAttribute('data-name'));

		let selectedRequestsText = '';

		if (selectedRequests.length > 0) {
			selectedRequests.forEach((request) => {
				selectedRequestsText += `<li>
											<span>${request}</span>
											<span class="close"></span>
										</li>`;
			})
			
			dropdownInput.style.pointerEvents = 'auto';
			dropdownInput.classList.remove('error');
			dropdownInput.classList.add('not_error');
        } else {
			selectedRequestsText = `<li class="_default>
										<span">Select options</span>
									</li>`;
			dropdownInput.style.pointerEvents = 'none';
			dropdownInput.classList.remove('not_error');
			dropdownInput.classList.add('error');
		}

		dropdownInput.innerHTML = selectedRequestsText;
	}

	$('form .item-requests .dropdown__input').on('click', function () {
		$(this).closest('.dropdown').toggleClass('_open');
	});

	// Обробка кліків поза блоком "form .item-requests .dropdown"
	$(document).on('click', function (e) {
		$('form .item-requests .dropdown').each(function() {
			let requestsDropdown = $(this);

			if (!requestsDropdown.is(e.target) && requestsDropdown.has(e.target).length === 0) {
				requestsDropdown.find('.dropdown__input').css('pointer-events', 'auto');
				requestsDropdown.removeClass('_open');
			}
		});
	});
	$('.modal-contact-us .modal-content').on('click', function (e) {
		let requestsDropdown = $(this).closest('.modal-contact-us').find('.dropdown');

		if (!requestsDropdown.is(e.target) && requestsDropdown.has(e.target).length === 0) {
			requestsDropdown.find('.dropdown__input').css('pointer-events', 'auto');
			requestsDropdown.removeClass('_open');
		}
	});
	
	

	$('form .item-requests .dropdown__content input').on('change', function () {
		let form = $(this).closest('form')[0];
		getSelectedRequests(form);
	});
	

    $('form').on('click', '.item-requests .dropdown__input .close', function (e) {
        e.stopPropagation(); // Заборонити спливання події
        let form = $(this).closest('form')[0];
        let deletionRequest = $(this).siblings().text();

		$(this).closest('.dropdown').toggleClass('_open');
		$(this).closest('li').remove();
		$(form).find(`input[data-name='${deletionRequest}']`).prop('checked', false);
    });
	
}

$(document).ready(function() {
    const input = $('input[name="budget"].item__input');

    input.on('input', function() {
        // Отримати поточне значення
        let value = $(this).val();
        
        // Видалити все, що не є цифрою
        value = value.replace(/[^0-9]/g, '');
        
        // Оновити значення поля вводу
        $(this).val(value);
    });

    input.on('keydown', function(e) {
        // Дозволити клавіші навігації: backspace, delete, tab, escape, enter, home, end, left, right, up, down
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 35, 36, 37, 38, 39, 40]) !== -1 ||
            // Дозволити Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            (e.keyCode === 67 && (e.ctrlKey === true || e.metaKey === true)) ||
            (e.keyCode === 86 && (e.ctrlKey === true || e.metaKey === true)) ||
            (e.keyCode === 88 && (e.ctrlKey === true || e.metaKey === true))) {
            // Дозволити цю подію
            return;
        }

        // Переконатися, що це число і не дозволяти "-" (минус) та інші символи
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
});

function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}


if(document.querySelector('.single-post .banner-ab-test')) {
	const banners = document.querySelectorAll('.single-post .banner-ab-test');
	const randomIndexBanner = getRandomNumber(banners.length);

	banners.forEach((banner, index) => {
		if(index === randomIndexBanner) {
			banner.style.display = 'flex';

			banner.querySelector('.banner__button').addEventListener('click', (e) => {
				window.dataLayer = window.dataLayer || [];
				window.dataLayer.push({
					'event': `click_banner_${randomIndexBanner + 1}`,
					'banner_location': 'footer'
				});

				console.table(window.dataLayer)
			})
		} else {
			banner.style.display = 'none';
		}
	})

	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({
		'event': `impression_banner_${randomIndexBanner + 1}`,
		'banner_location': 'footer'
	});

	console.table(window.dataLayer)
}

$('.bottom-banner__close').on('click', function () {
	$(this).closest('.bottom-banner').fadeOut();
	setCookie('bottom-banner', 'hide', 365)
})