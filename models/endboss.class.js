class Endboss extends MovableObject {
  width = 270;
  height = 420;
  x = 0;
  y = 60;
  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];
  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];
  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];
  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  offset = {
    top: 20,
    bottom: 40,
    left: 40,
    right: 40,
  };

  hasMadeFirstContact = false;

  /**
   * Initializes the enemy with various animations and sets its position.
   */
  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);

    [
      this.IMAGES_WALKING,
      this.IMAGES_ALERT,
      this.IMAGES_ATTACK,
      this.IMAGES_HURT,
      this.IMAGES_DEAD,
    ].forEach((images) => this.loadImages(images));

    this.x = 2500;
    this.animate();
  }

  /**
   * Animates the enemy based on its state (dead, hurt, aggressive, etc.).
   */
  animate() {
    let counter = 0;
    const animationInterval = 200;

    setInterval(() => {
      switch (true) {
        case this.isDead():
          this.playDeath();
          break;
        case this.isInjured():
          this.playHurt();
          break;
        case this.hasMadeFirstContact:
          counter++;
          this.endbossAlarm(counter);
          break;
        case this.energy <= 90:
          this.endbossAttackMode(counter);
          break;
        case this.energy < 70:
          this.endbossTriggersAlarmLoop(counter);
          break;
      }
    }, animationInterval);
  }

  /**
   * Plays the dead animation, stops movement, and triggers the game over screen after a delay.
   */
  playDeath() {
    let gameOverDelay = 1200;
    let animateDead = () => {
      this.playAnimation(this.IMAGES_DEAD);
      this.speed = 0;
    };

    animateDead();

    let scheduleGameOver = (delay) => {
      setTimeout(() => {
        gameLost();
      }, delay);
    };

    scheduleGameOver(gameOverDelay);
  }

  /**
   * Plays the hurt animation for the enemy.
   */
  playHurt() {
    return this.playAnimation(this.IMAGES_HURT);
  }

  /**
   * Raises the alarm by playing the alert animation, switches to walking, and then attacks after a certain number of iterations.
   */
  endbossAlarm(i) {
    this.setAnimationState(i);

    if (this.alertState()) {
      this.playAnimation(this.IMAGES_ALERT);
    }

    if (this.walkingState()) {
      this.playAnimation(this.IMAGES_WALKING);
      this.startWalking();
    }

    if (this.attackState()) {
      this.playAnimation(this.IMAGES_ATTACK);
    }
  }

  /**
   * Sets the animation state based on the index.
   * @param {number} i - The current animation index.
   */
  setAnimationState(i) {
    this.animationState = {
      alert: i < 4,
      walking: i > 5,
      attack: i >= 6,
    };
  }

  /**
   * Starts the walking animation by moving left or right.
   * Adjusts direction if needed.
   */
  startWalking() {
    let movementInterval = () => {
      if (!this.otherDirection) {
        this.moveLeft();
      } else {
        this.moveRight();
        this.otherDirection = true;
      }
    };

    setInterval(movementInterval, 15);
  }

  /**
   * Returns whether the alert animation state is active.
   * @returns {boolean} True if in alert state, otherwise false.
   */
  alertState() {
    return this.animationState.alert;
  }

  /**
   * Checks if the walking animation state is active.
   * @returns {boolean} True if walking, otherwise false.
   */
  walkingState() {
    return this.animationState.walking;
  }

  /**
   * Checks if the attack animation state is active.
   * @returns {boolean} True if attacking, otherwise false.
   */
  attackState() {
    return this.animationState.attack;
  }

  /**
   * Triggers the endboss's chaotic behavior by repeatedly calling the raise alarm function with a longer interval.
   */
  endbossTriggersAlarmLoop(i) {
    let intervalHandler = () => {
      this.endbossAlarm(i);
    };

    setInterval(intervalHandler, 2000);
  }

  /**
   * Triggers the endboss's aggressive behavior by repeatedly calling the raise alarm function.
   */
  endbossAttackMode(i) {
    let intervalHandler = () => {
      this.endbossAlarm(i);
    };

    setInterval(intervalHandler, 1000);
  }
}
