class Coin extends MovableObject {
  height = 120;
  width = 120;
  IMAGES = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  offset = {
    top: 45,
    bottom: 90,
    left: 45,
    right: 45,
  };

  /**
   * Initializes the coin object with an image, position, and animation.
   */
  constructor(x, y) {
    super().loadImage("img/8_coin/coin_2.png");

    let imageGroups = [this.IMAGES];
    imageGroups.forEach((images) => this.loadImages(images));

    this.x = x;
    this.y = y;

    let startBehaviors = [this.animate];
    startBehaviors.forEach((behavior) => behavior.call(this));
  }

  /**
   * Animates the coin by cycling through its images at regular intervals.
   */
  animate() {
    let animationSpeed = 400;
    let runAnimation = () => this.playAnimation(this.IMAGES);
    setInterval(runAnimation, animationSpeed);
  }
}
