/**
 * Starts the game by showing the canvas and hiding the start screen and menus.
 */
function gameStart() {
  document.getElementById("start").style.display = "none";
  document.getElementById("canvas").style.display = "block";
  let elementsToHide = ["gaming", "open-imprint"];
  elementsToHide.forEach((id) =>
    document.getElementById(id).classList.add("d-none")
  );
}

/**
 * Displays the manage section and hides the imprint section.
 */
function handleGame() {
  let manageSection = document.getElementById("manage");
  manageSection.classList.add("d-flex");
  manageSection.classList.remove("d-none");
  closeImprint();
}

/**
 * Hides the manage section by updating its classes.
 */
function hideManageSection() {
  let manageSection = document.getElementById("manage");
  manageSection.classList.add("d-none");
  manageSection.classList.remove("d-flex");
}

/**
 * Displays the imprint section and hides the manager overlay.
 */
function showImprint() {
  let imprint = document.getElementById("imprint-content");
  imprint.classList.add("d-flex");
  imprint.classList.remove("d-none");
  hideManageSection();
}

/**
 * Hides the imprint section by updating its classes.
 */
function closeImprint() {
  let imprint = document.getElementById("imprint-content");
  imprint.classList.add("d-none");
  imprint.classList.remove("d-flex");
}

/**
 * Ends the game by showing the game-over screen and clearing all intervals.
 */
function gameLost() {
  let elements = {
    canvas: "none",
    "game-over": "block",
  };

  Object.entries(elements).forEach(([id, display]) => {
    document.getElementById(id).style.display = display;
  });

  resetIntervals();
}

/**
 * Displays the "game over" screen and clears all active intervals.
 */
function playerLost() {
  let elements = {
    canvas: "none",
    "you-lost": "block",
  };

  Object.entries(elements).forEach(([id, display]) => {
    document.getElementById(id).style.display = display;
  });

  resetIntervals();
}

/**
 * Restarts the game by hiding end screens and reinitializing the game.
 */
function playAgain() {
  ["game-over", "you-lost"].forEach((id) => {
    document.getElementById(id).style.display = "none";
  });

  init();
}

/**
 * Clears all active intervals by iterating through possible interval IDs.
 */
function resetIntervals() {
  for (let i = 1; i < 9999; i++) {
    clearInterval(i);
  }
}

/**
 * Reloads the page to return to the home screen.
 */
function home() {
  location.reload();
}
