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
const sizeOnScroll = 'size--on-scroll';

window.addEventListener('scroll', () => {
	if (window.pageYOffset > 50 && !header.classList.contains(sizeOnScroll)) {
		header.classList.add(sizeOnScroll);
	} else if (window.pageYOffset < 50 && header.classList.contains(sizeOnScroll)) {
		header.classList.remove(sizeOnScroll);
	}
});

const supAll = document.querySelectorAll('.tab__sup');
const tabAll = document.querySelectorAll('.tab');
const active = 'active';

supAll.forEach((elem, index) => {
	elem.addEventListener('click', function () {
		if (!supAll[index].classList.contains(active)) {
			for (let oldIndex = 0; oldIndex < supAll.length; oldIndex++) {
				const isOldSupActive = supAll[oldIndex].classList.contains(active);

				if (oldIndex !== index && isOldSupActive) {
					supAll[oldIndex].classList.remove(active);
					tabAll[oldIndex].classList.remove(active);
				}
			}

			supAll[index].classList.add(active);
			tabAll[index].classList.add(active);
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
			document.querySelectorAll(`.accr__text.${active}`).length >= 1 &&
			!accrAll[index].classList.contains(active)
		) {
			for (let oldIndex = 0; oldIndex < accrSup.length; oldIndex++) {
				const isOldAccrTextOpen = accrAll[oldIndex].classList.contains(active);

				if (oldIndex !== index && isOldAccrTextOpen) {
					accrBtnAll[oldIndex].classList.remove(active);
					accrAll[oldIndex].classList.remove(active);
				}
			}
		}

		accrBtnAll[index].classList.toggle(active);
		accrAll[index].classList.toggle(active);
	});
});
