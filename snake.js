const canvas = document.getElementById("snakeGame");
const ctx = canvas.getContext("2d");

const box = 20;
const canvasSize = 400;

let snake = [{ x: 9 * box, y: 9 * box }];
let direction = "RIGHT";
let food = {
  x: Math.floor(Math.random() * 19) * box,
  y: Math.floor(Math.random() * 19) * box
};

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
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

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "LEFT") snakeX -= box;
  if (direction === "UP") snakeY -= box;
  if (direction === "RIGHT") snakeX += box;
  if (direction === "DOWN") snakeY += box;

  // If snake eats food
  if (snakeX === food.x && snakeY === food.y) {
    food = {
    x: Math.floor(Math.random() * 29) * box,
    y: Math.floor(Math.random() * 29) * box
    };
  } else {
    snake.pop();
  }

  const newHead = { x: snakeX, y: snakeY };

  // Game over if hit wall
  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX >= canvasSize ||
    snakeY >= canvasSize
  ) {
    clearInterval(game);
    alert("Game Over");
  }

  snake.unshift(newHead);
}
let game = null; 

document.getElementById("startBtn").addEventListener("click", function () {

  // Prevent multiple starts
  if (!game) {
    game = setInterval(draw, 150);
    this.style.display = "none"; 
  }

});