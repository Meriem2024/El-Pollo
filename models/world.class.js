class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  throwableObjects = [];
  statusBar = new Statusbar();
  coinBar = new Coinbar();
  bottleBar = new Bottlebar();
  endbossBar = new Endbossbar();
  canShootAgain = false;
  hurt_sound = new Audio("audio/hurt.mp3");
  throw_sound = new Audio("audio/throw.mp3");
  bottle_sound = new Audio("audio/drink.mp3");
  boss_sound = new Audio("audio/boss-attack.mp3");
  coin_sound = new Audio("audio/coin-pickup.mp3");

  /**
   * Initializes the world with canvas and keyboard input.
   * @param {HTMLCanvasElement} canvas - Canvas element for drawing.
   * @param {Keyboard} keyboard - Keyboard controller for input.
   */
  constructor(canvas, keyboard) {
    this.initializeContext(canvas);
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.initializeMethods();
  }

  initializeContext(canvas) {
    this.ctx = canvas.getContext("2d");
  }

  initializeMethods() {
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * Sets up the world for the character.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Main game loop that runs at regular intervals.
   */
  run() {
    let executeActions = () => {
      let actions = [
        () => this.checkCollisions(),
        () => this.checkThrowObjects(),
        () => this.processCoinPickup(),
        () => this.processBottlePickup(),
        () => this.onBossFirstContact(),
        () => this.endbossTracksCharacter(),
      ];

      actions.forEach((action) => action());
    };

    setInterval(executeActions, 50);
  }

  /**
   * Checks if throwable objects are thrown and handles their effects.
   */
  checkThrowObjects() {
    if (
      this.keyboard.D &&
      this.character.amountOfBottle > 0 &&
      !this.canShootAgain
    ) {
      this.throwBottle();
      this.limitThrowRate();
    }
  }

  /**
   * Initiates the bottle-throwing action.
   * Creates a throwable object and updates related game states.
   */
  throwBottle() {
    this.character.lastMove = 0;
    let bottle = new ThrowableObject(
      this.character.x + 100,
      this.character.y + 100,
      this.character.otherDirection
    );

    this.throwableObjects.push(bottle);
    this.damageEndboss();
    this.hitEnemyWithBottle();
    this.character.amountOfBottle--;
    this.bottleBar.setPercentage(this.character.amountOfBottle * 10);

    if (!sound) {
      this.throw_sound.play();
    }
  }

  /**
   * Limits the throw rate by setting a cooldown period.
   * Prevents consecutive throws within 900ms.
   */
  limitThrowRate() {
    this.canShootAgain = true;

    setTimeout(() => {
      this.canShootAgain = false;
    }, 850);
  }

  /**
   * Checks collisions between the character and enemies or endboss.
   * If the character jumps to kill an enemy, the enemy is removed.
   * If the character collides with an enemy or endboss, the character gets hurt.
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy, i) => {
      this.level.endboss.forEach((endboss) => {
        let handleEnemyCollision = () => {
          if (this.canJumpAttack(enemy)) {
            enemy.lost();
          } else if (this.hasEnemyOrBossCollision(enemy, endboss)) {
            this.characterTakesDamage();
          }
        };

        handleEnemyCollision();

        if (enemy.isRemovable) {
          this.level.enemies.splice(i, 1);
        }
      });
    });
  }

  /**
   * Checks if the character is colliding with an enemy and is above the ground.
   */
  canJumpAttack(enemy) {
    return this.character.hasCollision(enemy) && this.character.aboveGround();
  }

  /**
   * Checks if the character is colliding with an enemy or endboss.
   */
  hasEnemyOrBossCollision(enemy, endboss) {
    let hasEnemyCollision = this.character.hasCollision(enemy);
    let hasEndbossCollision = this.character.hasCollision(endboss);

    return (hasEnemyCollision && enemy.energy > 0) || hasEndbossCollision;
  }

  /**
   * Reduces the character's health when hurt and plays the hurt sound.
   */
  characterTakesDamage() {
    this.character.hit();
    this.playHurtSound();
    this.statusBar.setPercentage(this.character.energy);
  }

  /**
   * Plays the hurt sound if sound is enabled.
   */
  playHurtSound() {
    if (!sound) {
      this.hurt_sound.play();
    }
  }

  /**
   * Sets the flag for first contact with the endboss when the character reaches the end station.
   */
  onBossFirstContact() {
    this.level.endboss.forEach((endboss) => {
      let isAtEndStation = this.character.reachEndStation();

      if (isAtEndStation) {
        endboss.hasMadeFirstContact = true;
      }
    });
  }

  /**
   * Checks if throwable objects collide with the endboss or are within a certain distance and causes damage.
   */
  damageEndboss() {
    let hurtEndbossIfClose = (bottle, endboss) => {
      if (
        bottle.hasCollision(endboss) ||
        Math.abs(bottle.x - endboss.x) <= 250
      ) {
        this.endbossGetsDamage(bottle, endboss);
      }
    };

    this.throwableObjects.forEach((bottle) => {
      this.level.endboss.forEach((endboss) => {
        hurtEndbossIfClose(bottle, endboss);
      });
    });
  }

  /**
   * Causes the endboss to take damage, play the boss sound, and updates the enemy bar.
   */
  endbossGetsDamage(bottle, endboss) {
    let breakBottle = () => (bottle.broken = true);
    let injureEndboss = () => endboss.receiveInjury();
    let updateEnemyBar = () => this.endbossBar.setPercentage(endboss.energy);

    breakBottle();
    injureEndboss();
    if (!sound) this.boss_sound.play();
    updateEnemyBar();
  }

  /**
   * Makes the endboss follow the character by adjusting its direction based on the character's position.
   */
  endbossTracksCharacter() {
    let [boss, charX, bossX, bossW] = [
      this.level.endboss[0],
      this.character.x,
      this.level.endboss[0].x,
      this.level.endboss[0].width,
    ];

    boss.otherDirection =
      charX > bossX + bossW
        ? true
        : charX < bossX
        ? false
        : boss.otherDirection;
  }

  /**
   * Checks if throwable objects collide with enemies and causes damage.
   */
  hitEnemyWithBottle() {
    this.throwableObjects.forEach((bottle) => {
      let hitEnemy = (enemy) => {
        bottle.broken = true;
        enemy.lost();
      };

      this.level.enemies.forEach((enemy) => {
        if (bottle.hasCollision(enemy)) hitEnemy(enemy);
      });
    });
  }

  /**
   * Collects coins when the character collides with them and updates the coin count.
   */
  processCoinPickup() {
    let handleCoinCollection = (coin, index) => {
      this.character.grabCoin();
      if (!sound) this.coin_sound.play();
      this.level.coins.splice(index, 1);
      this.coinBar.setPercentage(this.character.amountOfCoins);
    };

    this.level.coins.forEach((coin, i) => {
      if (this.character.hasCollision(coin)) handleCoinCollection(coin, i);
    });
  }

  /**
   * Collects bottles when the character collides with them and updates the bottle count.
   */
  processBottlePickup() {
    let updateBottleBar = (bottle, index) => {
      if (!sound) this.bottle_sound.play();
      this.level.bottles.splice(index, 1);
      this.bottleBar.setPercentage(this.character.amountOfBottle * 10);
    };

    this.level.bottles.forEach((bottle, i) => {
      if (
        this.character.hasCollision(bottle) &&
        this.character.amountOfBottle < 10
      ) {
        this.character.pickUpBottle();
        updateBottleBar(bottle, i);
      }
    });
  }

  /**
   * Clears the canvas, draws the game objects, and continuously updates the game view.
   */
  draw() {
    let resetCanvas = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.translate(this.camera_x, 0);
    };

    let drawStaticElements = () => {
      this.addObjectsToMap(this.level.backgrounds);
      this.addObjectsToMap(this.level.clouds);
      this.ctx.translate(-this.camera_x, 0);
    };

    let drawStatusBars = () => {
      this.addToMap(this.statusBar);
      this.addToMap(this.coinBar);
      this.addToMap(this.bottleBar);
      this.addToMap(this.endbossBar);
      this.ctx.translate(this.camera_x, 0);
    };

    let drawDynamicElements = () => {
      this.addToMap(this.character);
      this.addObjectsToMap(this.level.coins);
      this.addObjectsToMap(this.level.bottles);
      this.addObjectsToMap(this.level.enemies);
      this.addObjectsToMap(this.level.endboss);
      this.addObjectsToMap(this.throwableObjects);
      this.ctx.translate(-this.camera_x, 0);
    };

    let startAnimation = () => {
      requestAnimationFrame(() => this.draw());
    };

    resetCanvas();
    drawStaticElements();
    drawStatusBars();
    drawDynamicElements();
    startAnimation();
  }

  /**
   * Adds multiple objects to the map by calling addToMap for each object.
   */
  addObjectsToMap(objects) {
    objects.forEach(this.addToMap.bind(this));
  }

  /**
   * Adds a single object to the map and flips its image if needed.
   */
  addToMap(mo) {
    let drawObject = () => mo.draw(this.ctx);
    let flipIfNeeded = () => {
      if (mo.otherDirection) this.flipImage(mo);
    };
    let flipBackIfNeeded = () => {
      if (mo.otherDirection) this.flipImageBack(mo);
    };

    flipIfNeeded();
    drawObject();
    flipBackIfNeeded();
  }

  /**
   * Flips the object's image horizontally.
   */
  flipImage(mo) {
    let translateAndScale = () => {
      this.ctx.translate(mo.width, 0);
      this.ctx.scale(-1, 1);
    };

    let adjustPosition = () => {
      mo.x = -mo.x;
    };

    this.ctx.save();
    translateAndScale();
    adjustPosition();
  }

  /**
   * Reverts the flipped image back to its original orientation.
   */
  flipImageBack(mo) {
    let revertPosition = () => {
      mo.x = -mo.x;
    };

    this.ctx.restore();
    revertPosition();
  }
}
