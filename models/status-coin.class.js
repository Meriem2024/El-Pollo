class Coinbar extends DrawableObject {
  IMAGES = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png",
  ];

  percentage = 0;

  /**
   * Initializes the coin bar with images, position, and size.
   */
  constructor() {
    super();

    let initialize = () => {
      this.loadImages(this.IMAGES);
      Object.assign(this, { x: 25, y: 85, height: 50, width: 150 });
      this.setPercentage(0);
    };

    initialize();
  }

  /**
   * @param {number} percentage - Current percentage.
   * Updates the coin bar with the current percentage value and changes the image.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    this.img = this.imgCache[this.IMAGES[this.resolveImgIndex()]];
  }

  /**
   * Increases the percentage of the coin bar by 10.
   */
  collect() {
    this.percentage += 10;
  }

  /**
   * @returns The index of the image that corresponds to the current percentage.
   */
  resolveImgIndex() {
    let thresholds = [100, 81, 61, 41, 21, 0];
    let indices = [5, 4, 3, 2, 1, 0];

    for (let i = 0; i < thresholds.length; i++) {
      if (this.percentage >= thresholds[i]) {
        return indices[i];
      }
    }
  }
}
