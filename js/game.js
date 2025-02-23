let canvas;
let world;
let keyboard = new Keyboard();
sound = false;
music = new Audio("audio/background.mp3");
music.volume = 0.2;

/**
 * Mutes or unmutes the sound and updates the speaker icon accordingly.
 */
function mute() {
  let speakerIcon = document.getElementById("change-speaker");
  this.sound = !this.sound;

  if (!this.sound) {
    this.music.play();
    speakerIcon.style.backgroundImage = "url('img/music.png')";
    return;
  }

  this.music.pause();
  speakerIcon.style.backgroundImage = "url('img/mute.png')";
}

/**
 * Initializes the game setup, starts the game, and plays background music.
 */
function init() {
  keyboard.touchKeyBoardPress();
  let gameCanvas = document.getElementById("canvas");
  gameStart();
  levelInit();
  world = new World(gameCanvas, keyboard);

  if (sound) {
    this.music.pause();
  } else {
    this.music.play();
  }
}

/**
 * Initializes the body by pausing the music.
 */
function bodyInit() {
  music.pause();
  sound = true;
  document.querySelector("#change-speaker").style.backgroundImage =
    "url('img/mute.png')";
}
