class Endbossbar extends DrawableObject {
  IMAGES = [
    "img/7_statusbars/2_statusbar_endboss/green/green0.png",
    "img/7_statusbars/2_statusbar_endboss/green/green20.png",
    "img/7_statusbars/2_statusbar_endboss/green/green40.png",
    "img/7_statusbars/2_statusbar_endboss/green/green60.png",
    "img/7_statusbars/2_statusbar_endboss/green/green80.png",
    "img/7_statusbars/2_statusbar_endboss/green/green100.png",
  ];

  percentage = 100;

  /**
   * Initializes the enemy's health bar with images, position, and size.
   */
  constructor() {
    super();

    let setup = () => {
      this.loadImages(this.IMAGES);
      Object.assign(this, { x: 500, y: 10, height: 45, width: 145 });
      this.setPercentage(100);
    };

    setup();
  }

  /**
   * @param {number} percentage - Current percentage.
   * Sets the current percentage value and updates the health bar image.
   */
  setPercentage(percentage) {
    this.percentage = percentage;

    let getImagePath = () => {
      return this.IMAGES[this.resolveImgIndex()];
    };

    this.img = this.imgCache[getImagePath()];
  }

  /**
   * @returns The index of the image that corresponds to the current percentage.
   */
  resolveImgIndex() {
    let thresholds = [100, 80, 60, 40, 20, 0];
    let indices = [5, 4, 3, 2, 1, 0];

    for (let i = 0; i < thresholds.length; i++) {
      if (this.percentage >= thresholds[i]) {
        return indices[i];
      }
    }
  }
}
