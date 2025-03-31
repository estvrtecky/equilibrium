interface MenuInstance {
    toggleSelector: string;
    activeClass: string;
    toggleButtons: NodeListOf<HTMLElement>;
}
declare class Menu implements MenuInstance {
    private static instance;
    toggleSelector: string;
    activeClass: string;
    toggleButtons: NodeListOf<HTMLElement>;
    private initialized;
    constructor();
    private _init;
    private _addEventListeners;
    private _handleToggle;
}

export { Menu };
