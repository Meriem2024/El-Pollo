let level1 = null;

function levelInit() {
  level1 = new Level(
    [
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new smallChicken(),
      new smallChicken(),
      new smallChicken(),
      new smallChicken(),
      new smallChicken(),
    ],
    [new Endboss()],
    [new Cloud(), new Cloud()],
    [
      new BackgroundObject("img/5_background/layers/air.png", -719),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -719),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        -719
      ),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -719),

      new BackgroundObject("img/5_background/layers/air.png", 0),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/air.png", 719),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719),

      new BackgroundObject("img/5_background/layers/air.png", 719 * 2),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/1.png",
        719 * 2
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/1.png",
        719 * 2
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/1.png",
        719 * 2
      ),
      new BackgroundObject("img/5_background/layers/air.png", 719 * 3),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/2.png",
        719 * 3
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        719 * 3
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/2.png",
        719 * 3
      ),
    ],
    [
      new Coin(450, 210),
      new Coin(700, 220),
      new Coin(600, 200),
      new Coin(800, 160),
      new Coin(900, 130),
      new Coin(950, 140),
      new Coin(1500, 300),
      new Coin(1400, 200),
      new Coin(1300, 170),
      new Coin(1800, 190),
    ],
    [
      new Bottle("img/6_salsa_bottle/2_salsa_bottle_on_ground.png", 190, 350),
      new Bottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png", 270, 380),
      new Bottle("img/6_salsa_bottle/2_salsa_bottle_on_ground.png", 590, 340),
      new Bottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png", 630, 355),
      new Bottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png", 710, 355),
      new Bottle("img/6_salsa_bottle/2_salsa_bottle_on_ground.png", 840, 365),
      new Bottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png", 950, 375),
      new Bottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png", 1400, 345),
      new Bottle("img/6_salsa_bottle/2_salsa_bottle_on_ground.png", 1540, 355),
      new Bottle("img/6_salsa_bottle/2_salsa_bottle_on_ground.png", 1700, 355),
    ]
  );
}
