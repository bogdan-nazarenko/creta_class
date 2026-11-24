const header = document.querySelector(".header");

const headerPaddingChanger = {
    timeoutID: null,

    togglePadding(handler) {
        header.classList.toggle("header_padding_reduced", window.scrollY > 50);

        handler.timeoutID = null;
    },

    handleEvent() {
        if (this.timeoutID) return;

        this.timeoutID = setTimeout(this.togglePadding, 100, this);
    },
};

headerPaddingChanger.handleEvent();
window.addEventListener("scroll", headerPaddingChanger);
