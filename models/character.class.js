class Character extends MovableObject {
  x = 0;
  y = 200;
  width = 135;
  height = 260;
  lastMove = 0;
  speed = 8;

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];
  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];
  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];
  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];
  IMAGES_INACTIVE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];
  IMAGES_SLEEP = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];
  world;

  offset = {
    top: 80,
    bottom: 10,
    left: 10,
    right: 10,
  };

  walking_sound = new Audio("audio/running.mp3");
  jumping_sound = new Audio("audio/jump.mp3");
  throwing_sound = new Audio("audio/throw.mp3");
  loosing_sound = new Audio("audio/game-over.mp3");
  snoring_sound = new Audio("audio/snore.mp3");

  /**
   * Initializes the character by loading images, applying gravity,
   * and setting up animations and states.
   */
  constructor() {
    super();
    this.loadImage("img/2_character_pepe/2_walk/W-21.png");

    let loadAllImages = () => {
      let imageGroups = [
        this.IMAGES_WALKING,
        this.IMAGES_JUMPING,
        this.IMAGES_DEAD,
        this.IMAGES_HURT,
        this.IMAGES_INACTIVE,
        this.IMAGES_SLEEP,
      ];

      imageGroups.forEach((images) => this.loadImages(images));
    };

    let executeBehaviors = () => {
      let characterBehaviors = [
        this.animate,
        this.trackIdleTime,
        this.stand,
        this.playDeath,
      ];

      characterBehaviors.forEach((behavior) => behavior.call(this));
    };

    loadAllImages();
    this.enableGravity();
    executeBehaviors();
  }

  /**
   * Handles character animation by managing movement,
   * sound, and jumping at specified intervals.
   */
  animate() {
    let initiateAnimations = () => {
      setInterval(() => this.updateMovement(), 1000 / 60);
      setInterval(() => this.animateCharacter(), 75);
      // setInterval(() => this.jumpCharacter(), 100);
    };

    this.walking_sound.pause();
    initiateAnimations();
  }

  /**
   * Moves the character based on direction and jump conditions.
   * Updates the camera position relative to the character.
   */
  updateMovement() {
    let movementActions = [
      { shouldMove: this.isMoveRightAllowed, action: this.moveRight },
      { shouldMove: this.isMoveLeftAllowed, action: this.moveLeft },
      { shouldMove: this.checkJump, action: this.jump },
    ];

    movementActions.forEach(({ shouldMove, action }) => {
      if (shouldMove.call(this)) action.call(this);
    });

    this.world.camera_x = -this.x + 100;
  }

  /**
   * Checks if the character can move left without exceeding the level's start boundary.
   */
  isMoveLeftAllowed() {
    let isKeyPressed = this.world.keyboard.LEFT;
    let isWithinBounds = this.x > 0;

    return isKeyPressed && isWithinBounds;
  }

  /**
   * Moves the character to the left, updates direction,
   * and handles sound and movement state.
   */
  moveLeft() {
    let pauseSnoring = () => this.snoring_sound.pause();
    let setDirection = () => (this.otherDirection = true);
    let resetMove = () => (this.lastMove = 0);
    let shouldPlayWalking = !sound && !this.aboveGround();

    super.moveLeft();
    pauseSnoring();
    setDirection();
    resetMove();
    if (shouldPlayWalking) this.walking_sound.play();
  }

  /**
   * Checks if the character can move right within the level boundaries.
   */
  isMoveRightAllowed() {
    let isKeyPressed = this.world.keyboard.RIGHT;
    let isWithinBounds = this.x < this.world.level.level_end_x;
    return isKeyPressed && isWithinBounds;
  }

  /**
   * Moves the character to the right and handles sounds,
   * direction, and movement state.
   */
  moveRight() {
    let pauseSnoring = () => this.snoring_sound.pause();
    let setDirection = () => (this.otherDirection = false);
    let resetMove = () => (this.lastMove = 0);
    let shouldPlayWalking = !sound && !this.aboveGround();

    super.moveRight();
    pauseSnoring();
    setDirection();
    resetMove();
    if (shouldPlayWalking) this.walking_sound.play();
  }

  /**
   * Checks if the character can jump when the SPACE key is pressed
   * and the character is on the ground.
   */
  checkJump() {
    let keyPressCheck = this.world.keyboard.SPACE;
    let groundCheck = !this.aboveGround();

    return keyPressCheck && groundCheck;
  }

  /**
   * The Character jumps.
   */
  jump() {
    let stopSnoring = () => this.snoring_sound.pause();
    let resetMoveTimer = () => (this.lastMove = 0);
    let playJumpSound = () => {
      if (!sound) this.jumping_sound.play();
    };

    super.jump();
    stopSnoring();
    resetMoveTimer();
    playJumpSound();
  }

  /**
   * Plays the jumping animation when the character is above the ground.
   */
  jumpCharacter() {
    let isAbove = this.aboveGround();
    if (isAbove) this.playAnimation(this.IMAGES_JUMPING);
  }

  /**
   * Plays the character's animations based on movement
   * or hurt status.
   */
  animateCharacter() {
    let currentAnimation = this.isInjured()
      ? this.IMAGES_HURT
      : this.aboveGround()
      ? this.IMAGES_JUMPING
      : this.world.keyboard.RIGHT || this.world.keyboard.LEFT
      ? this.IMAGES_WALKING
      : this.IMAGES_INACTIVE;

    this.playAnimation(currentAnimation);
  }

  /**
   * Tracks idle time when no keyboard inputs are detected.
   */
  trackIdleTime() {
    let keysInactive = () =>
      !this.world.keyboard.RIGHT &&
      !this.world.keyboard.LEFT &&
      !this.world.keyboard.SPACE &&
      !this.world.keyboard.D;

    let incrementIdleCounter = () => {
      if (keysInactive()) {
        this.lastMove++;
      }
    };

    setInterval(incrementIdleCounter, 1000);
  }

  /**
   * Plays inactive or sleeping animations based on idle time.
   * Handles snoring sound effects accordingly.
   */
  stand() {
    let checkActivity = () => {
      let isInactive = this.lastMove > 1;
      let isAsleep = this.lastMove > 4;

      if (isInactive) this.playAnimation(this.IMAGES_INACTIVE);
      if (isAsleep) {
        this.playAnimation(this.IMAGES_SLEEP);
        sound ? this.snoring_sound.pause() : this.snoring_sound.play();
      }
    };

    setInterval(checkActivity, 1000);
  }

  /**
   * Plays the death animation and triggers the "game over" state.
   * Handles sound effects for losing.
   */
  playDeath() {
    let checkIfDead = () => {
      if (this.isDead()) {
        this.snoring_sound.pause();
        this.playAnimation(this.IMAGES_DEAD);
        if (!sound) this.loosing_sound.play();
        setTimeout(() => playerLost(), 1000);
      }
    };

    setInterval(checkIfDead, 200);
  }
}
