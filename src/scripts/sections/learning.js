const learningCarousel = new Swiper(".learning__carousel", {
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
        breakpoint() {
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
