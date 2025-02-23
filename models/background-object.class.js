/**
 * Represents a background object in the game.
 * Extends the MovableObject class with specific dimensions and position.
 */
class BackgroundObject extends MovableObject {
  width = 720;
  height = 480;

  constructor(imagePath, xPosition) {
    super().loadImage(imagePath);
    this.x = xPosition;
    this.y = 480 - this.height;
  }
}
