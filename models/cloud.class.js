class Cloud extends MovableObject {
  y = 20;
  width = 505;
  height = 255;

  /**
   * Initializes the cloud background object with an image and random position.
   */
  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");

    let initialXPosition = Math.random() * 500;
    this.x = initialXPosition;

    let startBehaviors = [this.animate];
    startBehaviors.forEach((behavior) => behavior.call(this));
  }

  /**
   * Animates the cloud by moving it to the left.
   */
  animate() {
    this.moveLeft();
  }
}
