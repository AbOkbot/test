// Pong Game in JavaScript

const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');

// Create the pong paddle
const paddleWidth = 10;
const paddleHeight = 100;

// left paddle position
const player = { x: 0, y: canvas.height / 2 - paddleHeight / 2 }; 
// right paddle position
const ai = { x: canvas.width - paddleWidth, y: canvas.height / 2 - paddleHeight / 2 };

// ball settings
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  speed: 4,
  velocityX: 4,
  velocityY: 4
};

// Score
let playerScore = 0;
let aiScore = 0;

// Draw everything on the canvas
function draw() {
  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Draw paddles
  context.fillStyle = 'blue';
  context.fillRect(player.x, player.y, paddleWidth, paddleHeight);
  context.fillStyle = 'red';
  context.fillRect(ai.x, ai.y, paddleWidth, paddleHeight);

  // Draw ball
  context.fillStyle = 'white';
  context.beginPath();
  context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
  context.fill();

  // Draw the score
  context.font = '30px Arial';
  context.fillText(playerScore, canvas.width / 4, canvas.height / 5);
  context.fillText(aiScore, 3 * canvas.width / 4, canvas.height / 5);
}

// Update game objects
function update() {
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;

  // Wall collision (top and bottom)
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.velocityY = -ball.velocityY;
  }

  // Paddle collision
  if (ball.x - ball.radius < player.x + paddleWidth && ball.y > player.y && ball.y < player.y + paddleHeight) {
    ball.velocityX = -ball.velocityX;
  }
  if (ball.x + ball.radius > ai.x && ball.y > ai.y && ball.y < ai.y + paddleHeight) {
    ball.velocityX = -ball.velocityX;
  }

  // Update scores
  if (ball.x - ball.radius < 0) {
    aiScore++;
    resetBall();
  } else if (ball.x + ball.radius > canvas.width) {
    playerScore++;
    resetBall();
  }
}

// Reset ball to center
function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.velocityX = -ball.velocityX;
}

// AI movement for right paddle
function aiMovement() {
  // Simple AI to follow the ball
  if (ball.y < ai.y) {
    ai.y -= 5;
  } else if (ball.y > ai.y + paddleHeight) {
    ai.y += 5;
  }
}

// Game loop
function game() {
  draw();
  update();
  aiMovement();
  requestAnimationFrame(game);
}

// Event listeners for player movement
document.addEventListener('mousemove', (event) => {
  const rect = canvas.getBoundingClientRect();
  player.y = event.clientY - rect.top - paddleHeight / 2;
});

// Start the game
game();
