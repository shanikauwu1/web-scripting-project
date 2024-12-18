// Shanika Ekanayake
// Final project -Basic

const gameBoard = document.querySelector(".game");
const resetBtn = document.querySelector(".reset");
const counterDiv = document.querySelector(".counter");
const NumberOfOpenBoxDiv = document.querySelector(".number-openBoxes");

// Get the modal and buttons
const modal = document.getElementById("popbox");
const playAgainBtn = document.querySelector(".playAgain");
const startBtn = document.querySelector(".Start");
const quitBtn = document.querySelector(".quit");

// variables declare
let counter = 0;
const emoji1 = ["😧", "😴", "😗", "😍", "😮", "😵", "😩", "☹️"];
const emojis = [...emoji1, ...emoji1];

// start the game with butoon
modal.style.display = "block";
playAgainBtn.style.display = "none";

startBtn.addEventListener("click", () => {
  gameLoad();
});

let openBoxes = []; // Array to track currently opened boxes

// Generate the game board
for (let i = 0; i < emojis.length; i++) {
  const boxEmoji = document.createElement("div");
  boxEmoji.className = "item";
  boxEmoji.innerHTML = emojis[i];
  gameBoard.appendChild(boxEmoji);

  // Event listener for each box click
  boxEmoji.onclick = function () {
    counter += 1;
    counterDiv.innerHTML = counter;
    //console.log(counter);
    if (
      openBoxes.length < 2 &&
      !boxEmoji.classList.contains("openBox") &&
      !boxEmoji.classList.contains("matchBoxes")
    ) {
      MouseSound();
      boxEmoji.classList.add("openBox");
      openBoxes.push(boxEmoji);

      if (openBoxes.length === 2) {
        // Check for a match after 500ms
        setTimeout(() => {
          if (openBoxes[0].innerHTML === openBoxes[1].innerHTML) {
            openBoxes[0].classList.add("matchBoxes");
            openBoxes[1].classList.add("matchBoxes");
          } else {
            openBoxes[0].classList.remove("openBox");
            openBoxes[1].classList.remove("openBox");
          }
          openBoxes = []; // Reset openBoxes array

          // number of open boxes and update the div

          // Check if all boxes are matched
          if (
            document.querySelectorAll(".matchBoxes").length === emojis.length
          ) {
            loadFinalMessage();
          }

          NumberOfOpenBoxDiv.innerHTML =
            document.querySelectorAll(".matchBoxes").length;
        }, 500);
      }
    }
  };
}

// Reset the game when the reset button is clicked
resetBtn.addEventListener("click", () => {
  gameLoad();
});

// quit buttion event handler for  quit the game

quitBtn.addEventListener("click", () => {
  location.reload();
});

function gameLoad() {
  modal.style.display = "none";
  counter = 0;
  counterDiv.innerHTML = 0;
  NumberOfOpenBoxDiv.innerHTML = 0;
  openBoxes = [];
  const items = document.querySelectorAll(".item");
  items.forEach((item) => {
    item.classList.remove("openBox", "matchBoxes");
    item.innerHTML = ""; // Clear the emoji
  });

  shuffleEmojis(emojis); // Re-shuffle the emojis
  bgSounds();
  items.forEach((item, index) => {
    item.innerHTML = emojis[index];
  });
}

function loadFinalMessage() {
  modal.style.display = "block";
  startBtn.style.display = "none";
  playAgainBtn.style.display = "block";
  document.querySelector(".modal-content h2").innerHTML =
    "Congratulations!<br /> you win";
}

// Fisher-Yates shuffle to randomize the emojis array   from stack overflow
function shuffleEmojis(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }

  //console.log(array);
}

// play again button
playAgainBtn.addEventListener("click", function () {
  gameLoad();
});

// sound clip  for mouse click
function MouseSound() {
  var fileUrl = "/media/click-47609.mp3";
  var audio = new Audio(fileUrl);
  audio.play();
}
// add the bg sound
function bgSounds() {
  var fileUrl =
    "/media/the-funny-bunch-giulio-fazio-main-version-02-28-16840.mp3";
  var audio = new Audio(fileUrl);
  audio.play();
}
