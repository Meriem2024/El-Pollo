class ThrowableObject extends MovableObject {
  IMAGES_THROW = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  broken = false;

  /**
   * Initializes the throwable bottle with position, direction, and world.
   * @param {number} x - Start X coordinate.
   * @param {number} y - Start Y coordinate.
   * @param {boolean} otherDirection - Flag indicating the direction.
   * @param {number} world - Position where it starts.
   */
  constructor(x, y, otherDirection, world) {
    super();
    let initialize = () => {
      this.loadImage(
        "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
      );
      this.loadImages(this.IMAGES_THROW);
      this.loadImages(this.IMAGES_SPLASH);
      Object.assign(this, {
        x,
        y,
        otherDirection,
        world,
        height: 50,
        width: 50,
      });
      this.animate();
      this.throw();
    };
    initialize();
  }

  /**
   * Animates the bottle's rotation and splash states.
   */
  animate() {
    let animationHandler = () => {
      let images = this.broken ? this.IMAGES_SPLASH : this.IMAGES_THROW;
      this.playAnimation(images);
    };

    setInterval(animationHandler, 60);
  }

  /**
   * Controls the position and speed of the bottle as it moves.
   */
  movingBottle() {
    let updatePosition = () => {
      if (this.y >= 370) {
        this.speedY = 0;
        Object.assign(this, { x: this.x + 10, y: this.y + 10, broken: true });
      } else {
        this.x += this.otherDirection ? -10 : 10;
      }
    };

    updatePosition();
  }

  /**
   * Sets the speed of the bottle and applies gravity.
   */
  throw() {
    let applyMovement = () => this.movingBottle();

    this.speedY = 20;
    this.enableGravity();
    setInterval(applyMovement, 25);
  }
}
