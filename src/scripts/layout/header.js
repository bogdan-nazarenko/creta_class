const header = document.querySelector(".header");

const headerPaddingChanger = {
    isWaiting: false,
    handleEvent() {
        if (this.isWaiting) return;

        this.isWaiting = true;

        setTimeout(() => {
            header.classList.toggle(
                "header_padding_reduced",
                window.scrollY > 50
            );

            this.isWaiting = false;
        }, 100);
    },
};

headerPaddingChanger.handleEvent();
window.addEventListener("scroll", headerPaddingChanger);
