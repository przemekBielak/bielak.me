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
      headX: 0,
      headY: 0,
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
    this.headX = this.canvas.width / 2;
    this.headY = this.canvas.height / 2;

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
      this.ctx.rect(this.headX, this.headY, headSizeX, headSizeY);
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

      // snake controls
      if (this.direction == 3 && this.headX < this.canvas.width - headSizeX) {
        this.headX += headDx;
      } else if (this.direction == 2 && this.headX > 0) {
        this.headX -= headDx;
      } else if (this.direction == 0 && this.headY > 0) {
        this.headY -= headDy;
      } else if (
        this.direction == 1 &&
        this.headY < this.canvas.height - headSizeY
      ) {
        this.headY += headDy;
      }

      // apple colision detection
      if (this.headX == this.appleX && this.headY == this.appleY) {
        this.updateAppleX();
        this.updateAppleY();
        this.snakeLen++;
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

