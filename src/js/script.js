const swiper = new Swiper('.swiper', {
	navigation: {
		prevEl: '.btn__slider--prev',
		nextEl: '.btn__slider--next',
	},
	pagination: {
		el: '.slider__pag',
		clickable: true,
		bulletClass: 'slider__bullet',
		bulletActiveClass: 'active',
	},
	breakpoints: {
		1: {
			loop: false,
			spaceBetween: 20,
			slidesPerView: 1,
			slidesPerGroup: 1,
			pagination: {
				dynamicBullets: true,
			},
		},
		768: {
			loop: false,
			spaceBetween: 40,
			slidesPerView: 2,
			slidesPerGroup: 2,
			pagination: {
				dynamicBullets: false,
			},
		},
		1024: {
			loop: true,
			spaceBetween: 40,
			slidesPerView: 3,
			slidesPerGroup: 3,
			pagination: {
				dynamicBullets: false,
			},
		},
	},
});

const header = document.querySelector('header');

window.addEventListener('scroll', () => {
	header.classList.toggle('size--on-scroll', window.pageYOffset > 50);
	header.classList.length === 0 && header.removeAttribute('class');
});

const sliderPag = document.querySelector('.slider__pag');
const pagMod = 'swiper-pagination-bullets-dynamic';

window.addEventListener('resize', () => {
	setTimeout(() => {
		swiper.pagination.destroy();
		swiper.pagination.init();
		swiper.pagination.update();

		if (window.innerWidth >= 768) {
			sliderPag.classList.contains(pagMod) && sliderPag.classList.remove(pagMod);
			sliderPag.hasAttribute('style') && sliderPag.removeAttribute('style');
		}
	}, 100);
});

const supAll = document.querySelectorAll('.tab__sup');
const tabAll = document.querySelectorAll('.tab');
const active = 'active';

supAll.forEach((elem, index) => {
	elem.addEventListener('click', function () {
		if (!elem.classList.contains(active)) {
			for (let prevIndex = 0; prevIndex < supAll.length; prevIndex++) {
				const isPrevSupActive = supAll[prevIndex].classList.contains(active);

				if (prevIndex !== index && isPrevSupActive) {
					supAll[prevIndex].classList.remove(active);
					tabAll[prevIndex].classList.remove(active);
				}
			}

			elem.classList.add(active);
			tabAll[index].classList.add(active);
		}
	});
});

const media = document.querySelector('.media');
const video = document.querySelector('.video');
const playButton = document.querySelector('.media__play__button');

function manageMediaStyles(block, content = null) {
	if (document.fullscreenElement) {
		block.style.borderRadius = 'initial';

		if (content) {
			content.style.objectFit = 'contain';
		}
	} else {
		block.removeAttribute('style');

		if (content) {
			content.removeAttribute('style');
		}
	}
}

if (video && playButton) {
	playButton.addEventListener('click', () => {
		playButton.style.display = 'none';
		video.setAttribute('controls', '');
		video.play();
	});

	video.addEventListener('ended', () => {
		playButton.removeAttribute('style');
		video.removeAttribute('controls');
	});

	video.addEventListener('fullscreenchange', () => manageMediaStyles(media, video));
}

const ytVideo = document.querySelector('.yt-video');

if (ytVideo) {
	ytVideo.addEventListener('fullscreenchange', () => manageMediaStyles(media));
}

const accrSup = document.querySelectorAll('.accr__sup');
const accrText = document.querySelectorAll('.accr__text');
const openMod = 'open';

accrSup.forEach((elem, index) => {
	elem.addEventListener('click', function () {
		if (
			document.querySelectorAll(`.accr__text.${openMod}`).length >= 1 &&
			!accrText[index].classList.contains(openMod)
		) {
			for (let prevIndex = 0; prevIndex < accrSup.length; prevIndex++) {
				const isPrevTextOpen = accrText[prevIndex].classList.contains(openMod);

				if (prevIndex !== index && isPrevTextOpen) {
					accrText[prevIndex].classList.remove(openMod);
				}
			}
		}

		accrText[index].classList.toggle(openMod);
	});
});
