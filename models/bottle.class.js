/**
 * Represents a bottle object in the game.
 * Includes dimensions, collision offsets, and random horizontal positioning.
 */
class Bottle extends DrawableObject {
  height = 75;
  width = 75;

  offset = {
    top: 15,
    bottom: 25,
    left: 25,
    right: 25,
  };

  constructor(imagePath, x, y, multiplier = 500) {
    super().loadImage(imagePath);
    this.x = x + Math.random() * multiplier;
    this.y = y;
  }
}
