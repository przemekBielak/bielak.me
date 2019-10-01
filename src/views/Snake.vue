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
      snakeBody: {
        x: [],
        y: []
      },
      appleX: 0,
      appleY: 0,
      direction: 0, // 0 - up, 1 - down, 2 - left, 3 - right,
      lastDirection: 0,
      points: 0
    };
  },
  mounted: function() {
    document.addEventListener("keydown", this.keyDownHandler, false);

    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");

    this.restart();
  },
  methods: {
    // 0 - up, 1 - down, 2 - left, 3 - right
    keyDownHandler: function(event) {
      this.lastDirection = this.direction;
      if (event.keyCode == 39 && this.lastDirection != 2) {
        this.direction = 3;
      } else if (event.keyCode == 37 && this.lastDirection != 3) {
        this.direction = 2;
      } else if (event.keyCode == 38 && this.lastDirection != 1) {
        this.direction = 0;
      } else if (event.keyCode == 40 && this.lastDirection != 0) {
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
    restart: function() {
      this.direction = 0;
      this.snakeBody.x = [];
      this.snakeBody.y = [];
      this.snakeBody.x[0] = this.canvas.width / 2;
      this.snakeBody.y[0] = this.canvas.height / 2;
      this.snakeBody.x[1] = this.canvas.width / 2;
      this.snakeBody.y[1] = this.canvas.height / 2 - 10;
      this.snakeBody.x[2] = this.canvas.width / 2;
      this.snakeBody.y[2] = this.canvas.height / 2 - 20;
      this.snakeBody.x[3] = this.canvas.width / 2;
      this.snakeBody.y[4] = this.canvas.height / 2 - 30;

      // random apple position
      this.updateAppleX();
      this.updateAppleY();

      this.draw();
    },
    drawSnake: function() {
      this.ctx.beginPath();
      for (let i = 0; i < this.snakeBody.x.length; i++) {
        this.ctx.rect(
          this.snakeBody.x[i],
          this.snakeBody.y[i],
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
    updateSnakePosition: function() {
      const lastHeadX = this.snakeBody.x[0];
      const lastHeadY = this.snakeBody.y[0];

      if (this.direction == 3) {
        this.snakeBody.x.unshift(lastHeadX + headDx);
        this.snakeBody.y.unshift(lastHeadY);
      } else if (this.direction == 2) {
        this.snakeBody.x.unshift(lastHeadX - headDx);
        this.snakeBody.y.unshift(lastHeadY);
      } else if (this.direction == 0) {
        this.snakeBody.y.unshift(lastHeadY - headDy);
        this.snakeBody.x.unshift(lastHeadX);
      } else if (this.direction == 1) {
        this.snakeBody.y.unshift(lastHeadY + headDy);
        this.snakeBody.x.unshift(lastHeadX);
      }

      if (
        this.snakeBody.x[0] == this.appleX &&
        this.snakeBody.y[0] == this.appleY
      ) {
        this.updateAppleX();
        this.updateAppleY();
        this.points++;
      } else {
        this.snakeBody.x.pop();
        this.snakeBody.y.pop();
      }
    },
    checkColision: function() {
      let collision = false;

      if (this.snakeBody.x.length !== 0) {
        for (let i = 3; i < this.snakeBody.x.length; i++) {
          if (
            this.snakeBody.x[i] == this.snakeBody.x[0] &&
            this.snakeBody.y[i] == this.snakeBody.y[0]
          ) {
            collision = true;
          }
        }
      }

      //check collisions with borders
      if (
        this.snakeBody.x[0] > this.canvas.width - headSizeX ||
        this.snakeBody.x[0] < 0 ||
        this.snakeBody.y[0] < 0 ||
        this.snakeBody.y[0] > this.canvas.height - headSizeY
      ) {
        collision = true;
      }

      if (collision) {
        this.points = 0;
        this.restart();
      } else {
        setTimeout(() => {
          requestAnimationFrame(this.draw);
        }, 100);
      }
    },
    draw: function() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.drawApple();
      this.updateSnakePosition();
      this.checkColision();
      this.drawSnake();
    }
  }
};
</script>

<style>
#myCanvas {
  border: 2px solid black !important;
}
</style>

