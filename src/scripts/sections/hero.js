import { preventFormSubmission } from "../utils/form.js";

const heroForm = document.querySelector(".hero__form");

heroForm.addEventListener("submit", preventFormSubmission);
