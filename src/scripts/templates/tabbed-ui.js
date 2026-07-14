const tabbedUiData = {
    tabBars: document.querySelectorAll(".tabbed-ui__tab-bar"),
    tabHandlers: [],
    panelActiveClass: "tabbed-ui__panel_active",
};

const tabbedUiImpl = {
    switchWithKeys(event) {
        const currentTab = event.target;
        let newTab = null;

        switch (event.key) {
            case "ArrowLeft":
                newTab = currentTab.previousElementSibling;
                break;
            case "ArrowRight":
                newTab = currentTab.nextElementSibling;
                break;
            case "Home":
                newTab = this.firstElementChild;
                break;
            case "End":
                newTab = this.lastElementChild;
                break;
            default:
                return;
        }

        event.preventDefault();
        newTab?.focus();
    },

    tabHandler(event) {
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
            this.activePanel.classList.remove(tabbedUiData.panelActiveClass);
        }

        tab.ariaSelected = "true";
        tab.tabIndex = "0";
        panel?.classList.add(tabbedUiData.panelActiveClass);

        this.activeTab = tab;
        this.activePanel = panel;
    },

    init() {
        tabbedUiData.tabBars.forEach((tabBar) => {
            const handler = {
                activeTab: null,
                activePanel: null,
                handleEvent: this.tabHandler,
            };

            tabBar.addEventListener("click", handler);
            tabBar.addEventListener("keydown", this.switchWithKeys);

            tabbedUiData.tabHandlers.push(handler);

            if (tabBar.children.length >= 2) tabBar.children[1].click();
        });
    },

    disable() {
        tabbedUiData.tabBars.forEach((tabBar, index) => {
            tabBar.removeEventListener(
                "click",
                tabbedUiData.tabHandlers[index]
            );
            tabBar.removeEventListener("keydown", this.switchWithKeys);
        });

        tabbedUiData.tabHandlers.length = 0;
    },
};

tabbedUiImpl.init();
