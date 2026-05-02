const ACTIVE = "active";
const OPEN = "open";
const HIDDEN = "hidden";

const learningCarouselConfig = new Swiper(".learning__carousel", {
    navigation: {
        prevEl: ".learning__prev-arrow",
        nextEl: ".learning__next-arrow",
    },
    pagination: {
        el: ".learning__pagination",
        clickable: true,
        bulletClass: "learning__bullet",
        bulletActiveClass: ACTIVE,
    },
    breakpoints: {
        1: {
            spaceBetween: 20,
            slidesPerView: 1,
            slidesPerGroup: 1,
            pagination: {
                dynamicBullets: true,
            },
        },
        768: {
            spaceBetween: 30,
            slidesPerView: 2,
            slidesPerGroup: 2,
            pagination: {
                dynamicBullets: false,
            },
        },
        1024: {
            spaceBetween: 41,
            slidesPerView: 3,
            slidesPerGroup: 3,
            pagination: {
                dynamicBullets: false,
            },
        },
    },
    on: {
        breakpoint: function () {
            const learningPagination = this.pagination.el;

            if (this.params.pagination.dynamicBullets) {
                this.pagination.destroy();
                this.pagination.init();
                this.pagination.update();
            } else if (learningPagination) {
                learningPagination.classList.remove(
                    "swiper-pagination-bullets-dynamic"
                );
                learningPagination.style.removeProperty("width");
            }
        },
    },
});

const header = document.querySelector(".header");

window.addEventListener("scroll", function () {
    header.classList.toggle("header--height-on-scroll", this.scrollY > 50);
});

const heroForm = document.querySelector(".hero__form");

heroForm.addEventListener("submit", (event) => event.preventDefault());

const skillsTabs = document.querySelectorAll(".skills__tab");
const skillsPanels = document.querySelectorAll(".skills__panel");

{
    let activeTab = null;
    let activePanel = null;

    skillsTabs.forEach((tab, index) => {
        tab.addEventListener("click", function () {
            if (this.classList.contains(ACTIVE)) return;

            activeTab?.classList.remove(ACTIVE);
            activePanel?.classList.remove(ACTIVE);

            this.classList.add(ACTIVE);
            skillsPanels[index].classList.add(ACTIVE);
            activeTab = this;
            activePanel = skillsPanels[index];
        });
    });
}

skillsTabs[1].click();

const guideVideo = document.querySelector(".guide__video");
const guidePlayButton = document.querySelector(".guide__play-button");

if (guideVideo && guidePlayButton) {
    guidePlayButton.addEventListener("click", function () {
        this.classList.add(HIDDEN);
        guideVideo.controls = true;
        guideVideo.play();
    });

    guideVideo.addEventListener("ended", function () {
        this.controls = false;
        this.load();
        guidePlayButton.classList.remove(HIDDEN);
    });

    document.addEventListener("fullscreenchange", () => {
        const isGuideVideo = document.fullscreenElement === guideVideo;

        guideVideo.classList.toggle("contain", isGuideVideo);
    });
}

const faqAccordionItems = document.querySelectorAll(".faq__accordion-item");
const faqAccordionHeadings = document.querySelectorAll(
    ".faq__accordion-heading"
);

{
    let openedItem = null;

    faqAccordionHeadings.forEach((heading, index) => {
        heading.addEventListener("click", function () {
            const current = faqAccordionItems[index];

            if (!current.classList.contains(OPEN) && openedItem) {
                openedItem.classList.remove(OPEN);
            }

            current.classList.toggle(OPEN);
            openedItem = current.classList.contains(OPEN) ? current : null;
        });
    });
}
