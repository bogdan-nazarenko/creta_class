const heroForm = document.querySelector(".hero__form");

function heroFormHandler(event) {
    event.preventDefault();
}

heroForm.addEventListener("submit", heroFormHandler);
