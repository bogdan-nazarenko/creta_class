import { accordionImpl } from "../templates/accordion.js";

const faq = document.querySelector(".faq");
const accordion = faq.querySelector(".accordion");

accordionImpl.init(accordion);
