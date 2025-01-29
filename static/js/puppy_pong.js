/* TO MAKE SURE I GOT ALL THE REQUIREMENTS I ADDED THE BULLET POINTS AS COMMENTS 
- ALL COMMENTS FROM REQUIREMENTS ARE IN QUOTES "" */

let xPos = 0;
let yPos = 0;
let speedX = 5;
let speedY = 5;
let score = 0;
let timeElapsed = 0;
let gameOver = false;

const puppy = document.getElementById('puppy');
const player = document.getElementById('player');
const deathzone = document.getElementById('deathzone');
const scoreDisplay = document.getElementById('score-display');
const timeDisplay = document.getElementById('time-display');

const puppyWidth = 300;   // ensure the 3:2 ratio
const puppyHeight = 200;  // ensure the 3:2 ratio
const playerWidth = 120;  // paddle width similar to the one in the gif
const playerHeight = 20;

player.style.width = playerWidth + "px";
player.style.height = playerHeight + "px";
player.style.left = "calc(50% - 60px)";
player.style.bottom = "50px";
player.textContent = "Save the Puppy"; //name on gif



function updateX() {
  xPos += speedX;
  const windowWidth = window.innerWidth;

  // "Its motion should start from the top left corner, and be downwards and rightwards."
  if (xPos < 0) {
    xPos = 0;
    speedX *= -1;
    // "Every time it hits a boundary, it should switch the direction based on the boundary hit. 
    // For example, if the block was going right and down, and it hit the right "
  } else if (xPos + puppyWidth > windowWidth) {
    xPos = windowWidth - puppyWidth;
    speedX *= -1;
  }

  puppy.style.left = xPos + "px";
}

function updateY() {
  yPos += speedY;
  const windowHeight = window.innerHeight;
  const deathzoneTop = windowHeight - deathzone.offsetHeight;

  if (yPos < 0) {
    yPos = 0;
    speedY *= -1;
    // "Every time it hits a boundary, it should switch the direction based on the boundary hit."
  } else if (yPos + puppyHeight >= deathzoneTop) {
    const playerRect = player.getBoundingClientRect();
    const puppyRect = puppy.getBoundingClientRect();
    const overlapX = (puppyRect.left < playerRect.right) && (puppyRect.right > playerRect.left);

    if (overlapX) {
      yPos = deathzoneTop - puppyHeight;
      speedY *= -1;
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
    // "If it hits the bottom boundary (deathzone) and the player is not there, 
    // the puppy dies and player loses. This is when the puppy stop moving and the counters stop counting."
    } else {
      endGame();
      return;
    }
  }

  puppy.style.top = yPos + "px";
}

function movePuppy() {
  if (gameOver) return;
  updateX();
  updateY();
}

// "There should be a function called movePlayer that takes a new x coordinate 
// and move the player to that new coordinate." 
function movePlayer(ev) {
  if (gameOver) return;
  const mouseX = ev.clientX;
  // "It should handle corner cases such as: 
  // When the cursor is at the very end of either side of the browser, the player should not be out of bound"
  const halfPlayer = playerWidth / 2;
  let newLeft = mouseX - halfPlayer;

  // corner case: left edge
  if (newLeft < 0) newLeft = 0;
  // corner case: right edge
  if (newLeft + playerWidth > window.innerWidth) {
    newLeft = window.innerWidth - playerWidth;
  }

  player.style.left = newLeft + "px";
}

function updateTime() {
  if (!gameOver) {
    timeElapsed++;
    timeDisplay.textContent = `Time: ${timeElapsed} secs`;
  }
}

function endGame() {
  gameOver = true;
  alert("Game Over! Puppy has reached the bottom unprotected.");
}

puppy.style.position = "absolute";
puppy.style.left = xPos + "px";
puppy.style.top = yPos + "px";

setInterval(movePuppy, 30);    
setInterval(updateTime, 1000); 

// track mouse movement
window.addEventListener('mousemove', movePlayer);
