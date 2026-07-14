import { mqlDesktop, mqlMobile } from "../utils/responsive.js";

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

const mqls = [mqlDesktop, mqlMobile];

function getHeaderContainerHeight() {
    const containerHeight = header.children[0].scrollHeight;
    const htmlFontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize
    );

    header.style.setProperty(
        "--header-container-height",
        `${containerHeight / htmlFontSize}rem`
    );
}

getHeaderContainerHeight();
mqls.forEach((mql) => mql.addEventListener("change", getHeaderContainerHeight));
