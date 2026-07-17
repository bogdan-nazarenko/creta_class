import { desktopMql, mobileMql } from "../utils/responsive.js";

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

const mqls = [desktopMql, mobileMql];

const containerHeightGetter = {
    alreadyCalled: false,
    handleEvent() {
        if (this.alreadyCalled) return;

        this.alreadyCalled = true;

        const containerHeight = header.children[0].scrollHeight;
        const htmlFontSize = parseFloat(
            getComputedStyle(document.documentElement).fontSize
        );

        header.style.setProperty(
            "--header-container-height",
            `${containerHeight / htmlFontSize}rem`
        );

        setTimeout(() => {
            this.alreadyCalled = false;
        }, 100);
    },
};

containerHeightGetter.handleEvent();
mqls.forEach((mql) => mql.addEventListener("change", containerHeightGetter));
