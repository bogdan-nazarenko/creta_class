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
const toggleClass = 'size--on-scroll';

window.addEventListener('scroll', () => {
	const currentScroll = window.pageYOffset;
	if (currentScroll > 50) {
		header.classList.add(toggleClass);
	} else {
		header.classList.remove(toggleClass);
	}
});

const supAll = document.querySelectorAll('.tab__sup');
const tabAll = document.querySelectorAll('.tab');

supAll.forEach((elem, index) => {
	elem.addEventListener('click', function () {
		if (!supAll[index].classList.contains('sup--active')) {
			supAll.forEach(elem => {
				elem.classList.remove('sup--active');
			});
		}
		if (!tabAll[index].classList.contains('tab--show')) {
			tabAll.forEach(elem => {
				elem.classList.remove('tab--show');
			});
		}
		supAll[index].classList.add('sup--active');
		tabAll[index].classList.add('tab--show');
	});
});

const media = document.querySelector('.media');
const video = document.querySelector('.video');
const playButton = document.querySelector('.media__play__button');

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

const accrSup = document.querySelectorAll('.accr__sup');
const accrBtnAll = document.querySelectorAll('.accr__btn');
const accrAll = document.querySelectorAll('.accr__text');

accrSup.forEach((elem, index) => {
	elem.addEventListener('click', function () {
		if (!accrAll[index].classList.contains('accr--show')) {
			accrBtnAll.forEach(elem => {
				elem.classList.remove('btn--open');
			});
			accrAll.forEach(elem => {
				elem.classList.remove('accr--show');
			});
		}
		accrBtnAll[index].classList.toggle('btn--open');
		accrAll[index].classList.toggle('accr--show');
	});
});
