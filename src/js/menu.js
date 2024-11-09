// File: src/js/menu.js
// Description: Menu toggle functionality

class Menu {
  constructor() {
    // Singleton pattern
    if (Menu.instance) {
      return Menu.instance;
    }

    this.toggleSelector = "[data-eq-toggle]";
    this.activeClass = "show";
    this.toggleButtons = document.querySelectorAll(this.toggleSelector);

    Menu.instance = this;

    this._init();
  }

  _init() {
    if (this.initialized) {
      return;
    }

    this._addEventListeners();
    this.initialized = true;
  }

  _addEventListeners() {
    this.toggleButtons.forEach((button) => {
      button.addEventListener("click", (e) => this._handleToggle(e));
    });
  }

  _handleToggle(event) {
    const button = event.target;
    const targetId = button.getAttribute("data-eq-toggle");
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.classList.toggle(this.activeClass);
    }
  }
}

export default Menu;
