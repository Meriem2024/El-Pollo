class MovableObject extends DrawableObject {
  speed = 0.13;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.0;
  energy = 100;
  lastHit = 0;
  amountOfCoins = 0;
  amountOfBottle = 0;
  offsetY = 0;
  offsetX = 0;

  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  /**
   * Applies gravity to the character, adjusting speed when jumping.
   */
  enableGravity() {
    let interval = 1000 / 25;

    let updatePosition = () => {
      let isMovingVertically = this.aboveGround() || this.speedY > 0;

      if (isMovingVertically) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    };

    setInterval(updatePosition, interval);
  }

  /**
   * @returns true or false.
   * Checks if the object is above the ground or not.
   */
  aboveGround() {
    let isThrowable = this instanceof ThrowableObject;

    let isAboveThreshold = () => {
      return this.y < 200;
    };

    return isThrowable ? true : isAboveThreshold();
  }

  /**
   * @param {object} mo - The object to check collision with.
   * @returns true or false.
   * Checks if the current object collides with another object.
   */
  hasCollision(mo) {
    let [r1, r2] = [
      {
        l: this.x + this.offset.left,
        r: this.x + this.width - this.offset.right,
        t: this.y + this.offset.top,
        b: this.y + this.height - this.offset.bottom,
      },
      {
        l: mo.x + mo.offset.left,
        r: mo.x + mo.offset.right,
        t: mo.y + mo.offset.top,
        b: mo.y + mo.height - mo.offset.bottom,
      },
    ];
    return r1.r > r2.l && r1.b > r2.t && r1.l < r2.r && r1.t < r2.b;
  }

  /**
   * Checks if the character has reached the end station.
   */
  reachEndStation() {
    return this.x >= 1900;
  }

  /**
   * Collects a bottle and increments the bottle count.
   */
  pickUpBottle() {
    this.amountOfBottle += 1;
  }

  /**
   * Collects a coin and increments the coin count.
   * Caps the coin count at 100.
   */
  grabCoin() {
    let maxCoins = 100;
    this.amountOfCoins = Math.min(this.amountOfCoins + 10, maxCoins);
  }

  /**
   * Reduces energy when the character is hit.
   */
  hit() {
    this.energy = Math.max(this.energy - 10, 0);
    if (this.energy > 0) this.lastHit = Date.now();
  }

  /**
   * Reduces energy when the character is injured.
   */
  receiveInjury() {
    this.energy = Math.max(this.energy - 25, 0);
    if (this.energy > 0) this.lastHit = Date.now();
  }

  /**
   * Sets the character's energy to zero when lost.
   */
  lost() {
    return (this.energy = 0);
  }

  /**
   * Returns true if the character's energy is zero (dead).
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Returns true if the character is hurt (within 1 second of a hit).
   */
  isInjured() {
    let elapsedMs = Date.now() - this.lastHit;
    return elapsedMs / 1000 < 1;
  }

  /**
   * Loads and plays an animation by cycling through images.
   * @param {object} images - Array of images for animation.
   */
  playAnimation(images) {
    let imageIndex = this.currentImg % images.length;
    this.img = this.imgCache[images[imageIndex]];
    this.currentImg += 1;
  }

  /**
   * Moves the character to the right.
   */
  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  /**
   * Makes the character jump by setting speedY.
   */
  jump() {
    this.speedY = 30;
  }

  /**
   * Moves the character to the left.
   */
  moveLeft() {
    this.x -= this.speed;
  }
}
