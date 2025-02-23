class Keyboard {
  LEFT = false;
  RIGHT = false;
  DOWN = false;
  SPACE = false;
  D = false;

  constructor() {
    this.keyBoardPress();
  }

  /**
   * Listens for keydown events and updates the keyboard state based on pressed keys.
   */
  keyBoardPress() {
    window.addEventListener("keydown", (event) => {
      if (event.code === "Space") {
        keyboard.SPACE = true;
      }
      if (event.code === "ArrowLeft") {
        keyboard.LEFT = true;
      }
      if (event.code === "ArrowRight") {
        keyboard.RIGHT = true;
      }
      if (event.code === "ArrowDown") {
        keyboard.DOWN = true;
      }
      if (event.code === "KeyD") {
        keyboard.D = true;
      }
    });

    /**
     * Listens for keyup events and updates the keyboard state when keys are released.
     */
    window.addEventListener("keyup", (event) => {
      if (event.code === "Space") {
        keyboard.SPACE = false;
      }
      if (event.code === "ArrowLeft") {
        keyboard.LEFT = false;
      }
      if (event.code === "ArrowRight") {
        keyboard.RIGHT = false;
      }
      if (event.code === "ArrowDown") {
        keyboard.DOWN = false;
      }
      if (event.code === "KeyD") {
        keyboard.D = false;
      }
    });
  }

  /**
   * Handles touch input for movement and actions.
   * Maps touch events to corresponding control properties.
   */
  touchKeyBoardPress() {
    let controls = [
      { id: "go-left", prop: "LEFT" },
      { id: "go-right", prop: "RIGHT" },
      { id: "jump-action", prop: "SPACE" },
      { id: "throw-action", prop: "D" },
    ];

    controls.forEach(({ id, prop }) => {
      document.getElementById(id).addEventListener("touchstart", (e) => {
        e.preventDefault();
        this[prop] = true;
      });
      document.getElementById(id).addEventListener("touchend", (e) => {
        e.preventDefault();
        this[prop] = false;
      });
    });
  }
}
