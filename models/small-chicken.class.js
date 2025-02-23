class smallChicken extends MovableObject {
  width = 45;
  height = 45;
  y = 390;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];
  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  offset = {
    top: 0,
    bottom: 0,
    left: 5,
    right: 5,
  };

  isRemovable = false;
  deadSound = false;
  chick_sound = new Audio("audio/small-chicken-death.mp3");

  /**
   * Initializes the small chicken with images, position, speed, and animation.
   */
  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");

    let imageGroups = [this.IMAGES_WALKING, this.IMAGES_DEAD];

    imageGroups.forEach((images) => this.loadImages(images));

    this.x = 200 + Math.random() * 1400;
    this.speed = 0.15 + Math.random() * 0.5;

    let startBehaviors = [this.animate];
    startBehaviors.forEach((behavior) => behavior.call(this));
  }

  /**
   * Animates the small chicken's movement and animation.
   */
  animate() {
    let frameRate = 1000 / 60;
    let animationSpeed = 200;

    setInterval(() => {
      this.moveRight();
      this.otherDirection = true;
    }, frameRate);

    setInterval(() => this.playSmallChicken(), animationSpeed);
  }

  /**
   * Plays the small chicken's walking animation.
   */
  chickenIsWalking() {
    this.playAnimation(this.IMAGES_WALKING);
  }

  /**
   * Plays the small chicken's walking or dead animations and handles removal if dead.
   */
  playSmallChicken() {
    let handleDeath = () => {
      this.playDeath();
      if (this.chickenIsDead()) {
        this.playDeathSound();
      }
      this.removeOfMap();
    };

    let handleWalking = () => {
      this.chickenIsWalking();
    };

    this.isDead() ? handleDeath() : handleWalking();
  }

  /**
   * Plays the small chicken's death animation and stops its movement.
   */
  playDeath() {
    this.playAnimation(this.IMAGES_DEAD);
    this.speed = 0;
  }

  /**
   * Marks the small chicken as splicable for removal after a short delay.
   */
  removeOfMap() {
    let deletionDelay = 250;

    setTimeout(() => {
      this.isRemovable = true;
    }, deletionDelay);
  }

  /**
   * Checks if the small chicken's death sound has not been played yet.
   */
  chickenIsDead() {
    return !this.deadSound;
  }

  /**
   * Plays the small chicken's death sound if not muted and marks it as played.
   */
  playDeathSound() {
    let shouldPlaySound = !sound;

    if (shouldPlaySound) {
      this.chick_sound.play();
    }
    this.deadSound = true;
  }
}
