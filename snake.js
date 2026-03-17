const canvas = document.getElementById("snakeGame");
const ctx = canvas.getContext("2d");

const box = 20;
const canvasSize = 400;
const tileCount = canvasSize / box;

let snake;
let direction;
let food;
let score;
let gameRunning = false;

function initGame() {
  snake = [{ x: 9 * box, y: 9 * box }];
  direction = "RIGHT";
  food = randomFood();
  score = 0;
}

function randomFood() {
  return {
    x: Math.floor(Math.random() * tileCount) * box,
    y: Math.floor(Math.random() * tileCount) * box
  };
}

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
}

function update() {
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "LEFT") snakeX -= box;
  if (direction === "UP") snakeY -= box;
  if (direction === "RIGHT") snakeX += box;
  if (direction === "DOWN") snakeY += box;

  // Wall collision
  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX >= canvasSize ||
    snakeY >= canvasSize
  ) {
    endGame();
    return;
  }

  // Self collision
  for (let i = 0; i < snake.length; i++) {
    if (snakeX === snake[i].x && snakeY === snake[i].y) {
      endGame();
      return;
    }
  }

  // Eating food
  if (snakeX === food.x && snakeY === food.y) {
    score++;
    food = randomFood();
  } else {
    snake.pop();
  }

  snake.unshift({ x: snakeX, y: snakeY });
}

function draw() {
  ctx.fillStyle = "#8bac0f";
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  // Draw snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#0f380f" : "#306230";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // Draw food
  ctx.fillStyle = "#9bbc0f";
  ctx.fillRect(food.x, food.y, box, box);

  // Draw score
  ctx.fillStyle = "#0f380f";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 25);
}

function endGame() {
  gameRunning = false;
  alert("Game Over! Your score: " + score);
}

let lastTime = 0;
const speed = 120;

function gameLoop(timestamp) {
  if (!gameRunning) return;

  if (timestamp - lastTime > speed) {
    update();
    draw();
    lastTime = timestamp;
  }

  requestAnimationFrame(gameLoop);
}

document.getElementById("startBtn").addEventListener("click", function () {
  initGame();
  gameRunning = true;
  requestAnimationFrame(gameLoop);
});