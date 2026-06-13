document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".primary-button, .secondary-button");
  buttons.forEach((button) => {
    button.classList.add("button-link");
  });
});
