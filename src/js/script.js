const swiper = new Swiper('.swiper', {
	navigation: {
		prevEl: '.btn__slider--prev',
		nextEl: '.btn__slider--next',
	},
	pagination: {
		el: '.slider__pag',
		clickable: true,
	},
	breakpoints: {
		1: {
			loop: false,
			spaceBetween: 20,
			slidesPerView: 1,
			slidesPerGroup: 1,
		},
		768: {
			loop: false,
			spaceBetween: 40,
			slidesPerView: 2,
			slidesPerGroup: 2,
		},
		1024: {
			loop: true,
			spaceBetween: 40,
			slidesPerView: 3,
			slidesPerGroup: 3,
		},
	},
});

const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
	if (window.pageYOffset > 50 && !header.classList.contains('size--on-scroll')) {
		header.classList.add('size--on-scroll');
	} else if (window.pageYOffset < 50 && header.classList.contains('size--on-scroll')) {
		header.classList.remove('size--on-scroll');
	}
});

const supAll = document.querySelectorAll('.tab__sup');
const tabAll = document.querySelectorAll('.tab');

supAll.forEach((elem, index) => {
	elem.addEventListener('click', function () {
		if (!supAll[index].classList.contains('sup--active')) {
			for (let oldIndex = 0; oldIndex < supAll.length; oldIndex++) {
				const isOldSupActive = supAll[oldIndex].classList.contains('sup--active');

				if (oldIndex !== index && isOldSupActive) {
					supAll[oldIndex].classList.remove('sup--active');
					tabAll[oldIndex].classList.remove('tab--show');
				}
			}

			supAll[index].classList.add('sup--active');
			tabAll[index].classList.add('tab--show');
		}
	});
});

const media = document.querySelector('.media');
const video = document.querySelector('.video');
const playButton = document.querySelector('.media__play__button');

if (video && playButton) {
	function startVideo() {
		playButton.style.display = 'none';
		video.setAttribute('controls', '');
		video.play();
	}

	playButton.addEventListener('click', startVideo);

	video.addEventListener('ended', () => {
		playButton.removeAttribute('style');
		video.removeAttribute('controls');
	});

	video.addEventListener('fullscreenchange', () => {
		if (document.fullscreenElement) {
			media.style.borderRadius = 'initial';
			video.style.objectFit = 'contain';
		} else {
			media.removeAttribute('style');
			video.removeAttribute('style');
		}
	});
}

const ytVideo = document.querySelector('.yt-video');

if (ytVideo) {
	ytVideo.addEventListener('fullscreenchange', () => {
		if (document.fullscreenElement) {
			media.style.borderRadius = 'initial';
		} else {
			media.removeAttribute('style');
		}
	});
}

const accrSup = document.querySelectorAll('.accr__sup');
const accrBtnAll = document.querySelectorAll('.accr__btn');
const accrAll = document.querySelectorAll('.accr__text');

accrSup.forEach((elem, index) => {
	elem.addEventListener('click', function () {
		if (
			document.querySelectorAll('.accr__text.accr--show').length >= 1 &&
			!accrAll[index].classList.contains('accr--show')
		) {
			for (let oldIndex = 0; oldIndex < accrSup.length; oldIndex++) {
				const isOldAccrTextOpen = accrAll[oldIndex].classList.contains('accr--show');

				if (oldIndex !== index && isOldAccrTextOpen) {
					accrBtnAll[oldIndex].classList.remove('btn--open');
					accrAll[oldIndex].classList.remove('accr--show');
				}
			}
		}

		accrBtnAll[index].classList.toggle('btn--open');
		accrAll[index].classList.toggle('accr--show');
	});
});
