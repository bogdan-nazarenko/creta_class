class TabbedUI {
    static #registry = new WeakMap();
    static panelActiveClass = "tabbed-ui__panel_active";

    constructor(ui, tab) {
        const tabbedUI = document.querySelector(ui);

        this.tabBar = tabbedUI.querySelector(".tabbed-ui__tab-bar");
        this.activeTab = null;
        this.activePanel = null;

        this.init(tab);
    }

    handleEvent(event) {
        const tabBar = event.currentTarget;
        let target = event.target;
        let tab = null;

        while (target && target !== tabBar) {
            if (target.classList.contains("tabbed-ui__tab")) {
                tab = target;
                break;
            }

            target = target.parentElement;
        }

        if (!tab || tab === this.activeTab) return;

        const panelId = tab.getAttribute("aria-controls");
        const panel = document.getElementById(panelId);

        if (this.activeTab && this.activePanel) {
            this.activeTab.ariaSelected = "false";
            this.activeTab.tabIndex = "-1";
            this.activePanel.classList.remove(TabbedUI.panelActiveClass);
        }

        tab.ariaSelected = "true";
        tab.tabIndex = "0";
        panel?.classList.add(TabbedUI.panelActiveClass);

        this.activeTab = tab;
        this.activePanel = panel;
    }

    moveFocus(event) {
        const tabBar = event.currentTarget;
        const tab = event.target;
        let newTab = null;

        switch (event.key) {
            case "ArrowLeft":
                newTab = tab.previousElementSibling || tabBar.lastElementChild;
                break;
            case "ArrowRight":
                newTab = tab.nextElementSibling || tabBar.firstElementChild;
                break;
            case "Home":
                newTab = tabBar.firstElementChild;
                break;
            case "End":
                newTab = tabBar.lastElementChild;
                break;
            default:
                return;
        }

        event.preventDefault();
        newTab.focus();
    }

    init(tab) {
        tab = !tab ? 1 : tab;

        this.tabBar.addEventListener("click", this);
        this.tabBar.addEventListener("keydown", this.moveFocus);

        TabbedUI.#registry.set(this.tabBar, this);

        if (tab > 0 && tab <= this.tabBar.children.length) {
            this.tabBar.children[tab - 1].click();
        }
    }

    disable() {
        const handler = TabbedUI.#registry.get(this.tabBar);

        this.tabBar.removeEventListener("click", handler);
        this.tabBar.removeEventListener("keydown", this.moveFocus);

        TabbedUI.#registry.delete(this.tabBar);
    }
}

export default TabbedUI;
