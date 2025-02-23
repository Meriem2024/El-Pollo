class Statusbar extends DrawableObject {
  IMAGES = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  percentage = 100;

  /**
   * Initializes the status bar with images and sets its position and size.
   */
  constructor() {
    super();

    let initialize = () => {
      this.loadImages(this.IMAGES);
      this.x = 25;
      this.y = 40;
      this.height = 50;
      this.width = 150;
      this.setPercentage(100);
    };

    initialize();
  }

  /**
   * @param {number} percantage - Current percentage.
   * Updates the status bar with the current percentage value and changes the image.
   */
  setPercentage(percentage) {
    let imageIndex = this.resolveImgIndex();
    let selectedImagePath = this.IMAGES[imageIndex];
    this.percentage = percentage;
    this.img = this.imgCache[selectedImagePath];
  }

  /**
   * @returns The index of the image that corresponds to the current percentage.
   */
  resolveImgIndex() {
    let thresholds = [100, 80, 60, 40, 20];
    let indexMap = [5, 4, 3, 2, 1, 0];

    for (let i = 0; i < thresholds.length; i++) {
      if (this.percentage >= thresholds[i]) {
        return indexMap[i];
      }
    }

    return indexMap[indexMap.length - 1];
  }
}
