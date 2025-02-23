class Chicken extends MovableObject {
  width = 65;
  height = 65;
  y = 380;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  offset = {
    top: 0,
    bottom: 0,
    left: 5,
    right: 5,
  };

  deadSound = false;
  isRemovable = false;
  chicken_sound = new Audio("audio/normal-chicken-death.mp3");

  /**
   * Initializes the chicken with images, position, and animation.
   */
  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");

    let imageGroups = [this.IMAGES_WALKING, this.IMAGES_DEAD];

    imageGroups.forEach((images) => this.loadImages(images));

    this.x = 200 + Math.random() * 1400;
    this.speed = 0.15 + Math.random() * 0.5;
    this.animate();
  }

  /**
   * Animates the chicken's movement and animations.
   */
  animate() {
    let movementFrameRate = 1000 / 60;
    let animationFrameRate = 200;

    setInterval(() => this.moveLeft(), movementFrameRate);
    setInterval(() => this.animateChicken(), animationFrameRate);
  }

  /**
   * Plays the chicken's walking or dead animations and handles removal if dead.
   */
  animateChicken() {
    let handleDeath = () => {
      this.playDeath();
      if (this.chickenDead()) {
        this.playDeathSound();
      }
      this.removeOfMap();
    };

    let handleWalking = () => {
      this.chickenWalking();
    };

    this.isDead() ? handleDeath() : handleWalking();
  }

  /**
   * Plays the chicken's death animation and stops movement.
   */
  playDeath() {
    this.playAnimation(this.IMAGES_DEAD);
    this.speed = 0;
  }

  /**
   * Checks if the chicken's death sound has not been played yet.
   */
  chickenDead() {
    return !this.deadSound;
  }

  /**
   * Plays the chicken's death sound if not muted and marks it as played.
   */
  playDeathSound() {
    let shouldPlaySound = !sound;

    if (shouldPlaySound) {
      this.chicken_sound.play();
    }
    this.deadSound = true;
  }

  /**
   * Marks the chicken for removal from the game map after a delay.
   */
  removeOfMap() {
    let deletionDelay = 250;

    setTimeout(() => {
      this.isRemovable = true;
    }, deletionDelay);
  }

  /**
   * Plays the chicken's walking animation.
   */
  chickenWalking() {
    this.playAnimation(this.IMAGES_WALKING);
  }
}
