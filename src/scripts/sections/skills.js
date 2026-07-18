import { tabbedUiImpl } from "../templates/tabbed-ui.js";

const skills = document.querySelector(".skills");
const tabBar = skills.querySelector(".tabbed-ui__tab-bar");

tabbedUiImpl.init(tabBar, 2);
