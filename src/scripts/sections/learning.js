import { mobileMql } from "../utils/responsive.js";

const learningCarousel = {
    config: null,
};

function removeNavigationAttributes(prevEl, nextEl) {
    if (!mobileMql.matches) return;

    const attributes = [
        "role",
        "aria-label",
        "aria-controls",
        "aria-disabled",
        "tabindex",
    ];

    attributes.forEach((attribute) => {
        prevEl.removeAttribute(attribute);
        nextEl.removeAttribute(attribute);
    });
}

function clearPaginationStyles(pagination) {
    if (mobileMql.matches) return;

    pagination.classList.remove("swiper-pagination-bullets-dynamic");
    pagination.style.removeProperty("width");
}

function initCarousel() {
    if (learningCarousel.config) {
        const prevEl = learningCarousel.config.navigation.prevEl;
        const nextEl = learningCarousel.config.navigation.nextEl;
        const pagination = learningCarousel.config.pagination.el;

        learningCarousel.config.destroy(this);
        learningCarousel.config = null;

        removeNavigationAttributes(prevEl, nextEl);
        clearPaginationStyles(pagination);
    }

    learningCarousel.config = new Swiper(".learning__carousel", {
        navigation: {
            prevEl: ".learning__prev-arrow",
            nextEl: ".learning__next-arrow",
        },
        pagination: {
            el: ".learning__pagination",
            clickable: true,
            bulletClass: "learning__bullet",
            bulletActiveClass: "learning__bullet_active",
        },
        breakpoints: {
            1: {
                spaceBetween: 20,
                slidesPerView: 1,
                slidesPerGroup: 1,
                navigation: false,
                pagination: {
                    dynamicBullets: true,
                },
            },
            768: {
                spaceBetween: 30,
                slidesPerView: 2,
                slidesPerGroup: 2,
            },
            1024: {
                spaceBetween: 41,
                slidesPerView: 3,
                slidesPerGroup: 3,
            },
        },
    });
}

initCarousel();
mobileMql.addEventListener("change", initCarousel);
