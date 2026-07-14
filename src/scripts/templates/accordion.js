const accordionData = {
    accordions: document.querySelectorAll(".accordion"),
    accordionHandlers: [],
    contentOpenClass: "accordion__content_open",
};

const accordionImpl = {
    toggleAttribute(element) {
        if (element.ariaExpanded === "false") {
            element.ariaExpanded = "true";
            return true;
        }

        element.ariaExpanded = "false";
        return false;
    },

    accordionHandler(event) {
        const accordion = event.currentTarget;
        let target = event.target;
        let button = null;

        while (target && target !== accordion) {
            if (target.classList.contains("accordion__content")) break;

            if (target.classList.contains("accordion__button")) {
                button = target;
                break;
            }

            target = target.parentElement;
        }

        if (!button) return;

        const contentId = button.getAttribute("aria-controls");
        const content = document.getElementById(contentId);

        if (this.activeButton && this.activeButton !== button) {
            this.activeButton.ariaExpanded = "false";
            this.openedContent.classList.remove(accordionData.contentOpenClass);
        }

        const isActive = accordionImpl.toggleAttribute(button);
        this.activeButton = isActive ? button : null;

        const isOpen = content.classList.toggle(
            accordionData.contentOpenClass,
            isActive
        );
        this.openedContent = isOpen ? content : null;
    },

    init() {
        accordionData.accordions.forEach((accordion) => {
            const handler = {
                activeButton: null,
                openedContent: null,
                handleEvent: this.accordionHandler,
            };

            accordion.addEventListener("click", handler);
            accordionData.accordionHandlers.push(handler);
        });
    },

    disable() {
        accordionData.accordions.forEach((accordion, index) => {
            accordion.removeEventListener(
                "click",
                accordionData.accordionHandlers[index]
            );
        });

        accordionData.accordionHandlers.length = 0;
    },
};

accordionImpl.init();
