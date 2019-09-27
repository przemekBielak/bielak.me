<template>
  <div id="snake">
    <canvas id="myCanvas" width="480" height="320"></canvas>
  </div>
</template>

<script>
const headSizeX = 10;
const headSizeY = 10;
const headDx = 10;
const headDy = 10;

export default {
  name: "snake",
  data: function() {
    return {
      canvas: 0,
      ctx: 0,
      snakeBodyX: [],
      snakeBodyY: [],
      snakeLen: 1,
      appleX: 0,
      appleY: 0,
      direction: 0 // 0 - up, 1 - down, 2 - left, 3 - right
    };
  },
  mounted: function() {
    document.addEventListener("keydown", this.keyDownHandler, false);

    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.snakeBodyX[0] = this.canvas.width / 2;
    this.snakeBodyY[0] = this.canvas.height / 2;
    this.snakeBodyX[1] = this.canvas.width / 2;
    this.snakeBodyY[1] = this.canvas.height / 2 - 10;
    this.snakeBodyX[2] = this.canvas.width / 2;
    this.snakeBodyY[2] = this.canvas.height / 2 - 20;
    this.snakeBodyX[3] = this.canvas.width / 2;
    this.snakeBodyY[4] = this.canvas.height / 2 - 30;

    // random apple position
    this.updateAppleX();
    this.updateAppleY();

    this.draw();
  },
  methods: {
    // 0 - up, 1 - down, 2 - left, 3 - right
    keyDownHandler: function(event) {
      if (event.keyCode == 39) {
        this.direction = 3;
      } else if (event.keyCode == 37) {
        this.direction = 2;
      } else if (event.keyCode == 38) {
        this.direction = 0;
      } else if (event.keyCode == 40) {
        this.direction = 1;
      }
    },

    updateAppleX: function() {
      this.appleX =
        Math.round(
          Math.round(Math.random() * (this.canvas.width - headSizeX)) / 10
        ) * 10;
    },
    updateAppleY: function() {
      this.appleY =
        Math.round(
          Math.round(Math.random() * (this.canvas.height - headSizeY)) / 10
        ) * 10;
    },
    drawSnake: function() {
      this.ctx.beginPath();
      for (let i = 0; i < this.snakeBodyX.length; i++) {
        this.ctx.rect(
          this.snakeBodyX[i],
          this.snakeBodyY[i],
          headSizeX,
          headSizeY
        );
      }
      this.ctx.fillStyle = "black";
      this.ctx.fill();
      this.ctx.closePath();
    },
    drawApple: function() {
      this.ctx.beginPath();
      this.ctx.rect(this.appleX, this.appleY, headSizeX, headSizeY);
      this.ctx.fillStyle = "red";
      this.ctx.fill();
      this.ctx.closePath();
    },
    draw: function() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawSnake();
      this.drawApple();

      // apple colision detection
      if (
        this.snakeBodyX[0] == this.appleX &&
        this.snakeBodyY[0] == this.appleY
      ) {
        const lastSnakeX = this.snakeBodyX[0];
        const lastSnakeY = this.snakeBodyY[0];

        if (
          this.direction == 3 &&
          this.snakeBodyX[0] < this.canvas.width - headSizeX
        ) {
          this.snakeBodyX[0] += headDx;
        } else if (this.direction == 2 && this.snakeBodyX[0] > 0) {
          this.snakeBodyX[0] -= headDx;
        } else if (this.direction == 0 && this.snakeBodyY[0] > 0) {
          this.snakeBodyY[0] -= headDy;
        } else if (
          this.direction == 1 &&
          this.snakeBodyY[0] < this.canvas.height - headSizeY
        ) {
          this.snakeBodyY[0] += headDy;
        }

        this.snakeBodyX.pop(lastSnakeX);
        this.snakeBodyY.pop(lastSnakeY);

        this.snakeLen++;
        this.updateAppleX();
        this.updateAppleY();
      } else {
        const lastHeadX = this.snakeBodyX[0];
        const lastHeadY = this.snakeBodyY[0];

        if (
          this.direction == 3 &&
          this.snakeBodyX[0] < this.canvas.width - headSizeX
        ) {
          this.snakeBodyX.unshift(lastHeadX + headDx);
          this.snakeBodyY.unshift(lastHeadY);
        } else if (this.direction == 2 && this.snakeBodyX[0] > 0) {
          this.snakeBodyX.unshift(lastHeadX - headDx);
          this.snakeBodyY.unshift(lastHeadY);
        } else if (this.direction == 0 && this.snakeBodyY[0] > 0) {
          this.snakeBodyY.unshift(lastHeadY - headDy);
          this.snakeBodyX.unshift(lastHeadX);
        } else if (
          this.direction == 1 &&
          this.snakeBodyY[0] < this.canvas.height - headSizeY
        ) {
          this.snakeBodyY.unshift(lastHeadY + headDy);
          this.snakeBodyX.unshift(lastHeadX);
        }

        this.snakeBodyX.pop();
        this.snakeBodyY.pop();
      }

      setTimeout(() => {
        requestAnimationFrame(this.draw);
      }, 100);
    }
  }
};
</script>

<style>
#myCanvas {
  border: 2px solid black !important;
}
</style>

