<template>
  <div id="game">
    <canvas id="myCanvas" width="480" height="320"></canvas>
  </div>
</template>

<script>
import router from "../router";

let canvas;
let ctx;

let x;
let y;
const ballRadius = 10;
let dx = 2;
let dy = -2;

const paddleHeight = 10;
const paddleWidth = 75;
let paddleX;
let paddledx = 7;

let leftPressed = false;
let rightPressed = false;

let points = 0;

function keyDownHandler(event) {
  if (event.keyCode == 39) {
    rightPressed = true;
  } else if (event.keyCode == 37) {
    leftPressed = true;
  }
}

function keyUpHandler(event) {
  if (event.keyCode == 39) {
    rightPressed = false;
  } else if (event.keyCode == 37) {
    leftPressed = false;
  }
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "blue";
  ctx.fill();
  ctx.closePath();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

export default {
  name: "game",
  data: function() {
    return {
        gameover: false
    };
  },
  mounted: function() {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    x = canvas.width / 2;
    y = canvas.height / 2;

    paddleX = (canvas.width - paddleWidth) / 2;

    this.draw();
  },
  updated: function() {
    if (this.gameover) {
      router.push("home");
    }
  },
  methods: {
    draw: function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBall();
      drawPaddle();

      if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
      }

      if (y + dy < ballRadius) {
        dy = -dy;
      } else if (y + dy > canvas.height - ballRadius) {
        ctx.font = "30px Arial";
        ctx.fillText("Score: " + points, canvas.width / 2, canvas.height / 2);

        this.gameover = true;
        x = canvas.width / 2;
        y = canvas.height / 2;
        points = 0;
      }

      if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += paddledx;
      } else if (leftPressed && paddleX > 0) {
        paddleX -= paddledx;
      }

      if (
        x > paddleX &&
        x < paddleX + paddleWidth &&
        y == canvas.height - ballRadius - paddleHeight
      ) {
        points++;
        dy = -dy;
        console.log(points);
      }

      x += dx;
      y += dy;

      if (!this.gameover) {
        requestAnimationFrame(this.draw);
      }
      else {
        router.push({ path: '/' })
      }
    }
  }
};
</script>

<style>
#myCanvas {
  border: 2px solid black !important;
}
</style>

