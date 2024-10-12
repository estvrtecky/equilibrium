// File: src\js\menu.js
// Description: Menu toggle functionality

document.addEventListener("DOMContentLoaded", () => {
  const toggleButtons = document.querySelectorAll("[data-eq-toggle]");

  toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-eq-toggle");
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.classList.toggle("show");
      }
    });
  });
});
