class Accordion {
    static #registry = new WeakMap();
    static contentOpenClass = "accordion__content_open";

    constructor(accordion) {
        this.accordion = document.querySelector(accordion);
        this.activeButton = null;
        this.openedContent = null;

        this.init();
    }

    handleEvent(event) {
        const accordion = event.currentTarget;
        let target = event.target;
        let button = null;

        while (target && target !== accordion) {
            if (target.classList.contains("accordion__content")) return;

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
            this.openedContent.classList.remove(Accordion.contentOpenClass);
        }

        const isActive = this.toggleAttribute(button);
        this.activeButton = isActive ? button : null;

        const isOpen = content.classList.toggle(
            Accordion.contentOpenClass,
            isActive
        );
        this.openedContent = isOpen ? content : null;
    }

    toggleAttribute(element) {
        if (element.ariaExpanded === "false") {
            element.ariaExpanded = "true";
            return true;
        }

        element.ariaExpanded = "false";
        return false;
    }

    init() {
        this.accordion.addEventListener("click", this);

        Accordion.#registry.set(this.accordion, this);
    }

    disable() {
        const handler = Accordion.#registry.get(this.accordion);

        this.accordion.removeEventListener("click", handler);

        Accordion.#registry.delete(this.accordion);
    }
}

export default Accordion;
