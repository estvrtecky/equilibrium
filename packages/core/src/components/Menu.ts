// File: src/components/Menu.ts
// Description: Menu component functionality.

interface MenuInstance {
  toggleSelector: string;
  activeClass: string;
  toggleButtons: NodeListOf<HTMLElement>;
}

class Menu implements MenuInstance {
  private static instance: Menu;
  public toggleSelector: string = "[data-eq-toggle]";
  public activeClass: string = "show";
  public toggleButtons: NodeListOf<HTMLElement> = document.querySelectorAll(
    this.toggleSelector
  );
  private initialized: boolean = false;

  constructor() {
    // Singleton pattern
    if (Menu.instance) {
      return Menu.instance;
    }

    this.toggleSelector = "[data-eq-toggle]";
    this.activeClass = "show";
    this.toggleButtons = document.querySelectorAll(this.toggleSelector);
    this.initialized = false;

    Menu.instance = this;

    this._init();
  }

  private _init(): void {
    if (this.initialized) {
      return;
    }

    this._addEventListeners();
    this.initialized = true;
  }

  private _addEventListeners(): void {
    this.toggleButtons.forEach((button: HTMLElement) => {
      button.addEventListener("click", (e: Event) => this._handleToggle(e));
    });
  }

  private _handleToggle(event: Event): void {
    const button = event.target as HTMLElement;
    const targetId = button.getAttribute("data-eq-toggle");
    const targetElement = targetId ? document.getElementById(targetId) : null;

    if (targetElement) {
      targetElement.classList.toggle(this.activeClass);
    }
  }
}

export default Menu;
