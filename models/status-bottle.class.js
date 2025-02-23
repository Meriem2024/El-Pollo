class Bottlebar extends DrawableObject {
  IMAGES = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png",
  ];

  percentage = 0;

  /**
   * Initializes the bottle bar with images, position, and size.
   */
  constructor() {
    super();
    let setup = () => {
      this.loadImages(this.IMAGES);
      this.x = 25;
      this.y = 0;
      this.height = 50;
      this.width = 150;
      this.setPercentage(0);
    };

    setup();
  }

  /**
   * @param {number} percentage - Current percentage.
   * Updates the bottle bar with the current percentage value and changes the image.
   */
  setPercentage(percentage) {
    let index = this.resolveImgIndex();
    let selectedPath = this.IMAGES[index];

    this.percentage = percentage;
    this.img = this.imgCache[selectedPath];
  }

  /**
   * @returns The index of the image that corresponds to the current percentage.
   */
  resolveImgIndex() {
    let indexMap = [0, 1, 2, 3, 4, 5];
    return indexMap[Math.min(Math.floor(this.percentage / 15), 5)];
  }
}
