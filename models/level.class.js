class Level {
  enemies;
  endboss;
  backgrounds;
  coins;
  bottles;
  clouds;
  level_end_x = 2200;

  /**
   * Initializes the game objects: enemies, endboss, clouds, backgrounds, coins, and bottles.
   */
  constructor(enemies, endboss, clouds, backgrounds, coins, bottles) {
    Object.assign(this, {
      enemies,
      endboss,
      clouds,
      backgrounds,
      coins,
      bottles,
    });
  }
}
