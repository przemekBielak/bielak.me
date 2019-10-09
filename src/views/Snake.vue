<template>
  <div id="snake">
    <canvas id="myCanvas" width="300" height="180"></canvas>
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
      snakeBody: [],
      appleX: [],
      appleY: [],
      direction: [], // 0 - up, 1 - down, 2 - left, 3 - right,
      lastDirection: [],
      points: [],
      numOfSnakes: 1,
      collision: [],
      snakeColor: []
    };
  },
  mounted: function() {
    document.addEventListener("keydown", this.keyDownHandler, false);

    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");

    for (let snakeNum = 0; snakeNum < this.numOfSnakes; snakeNum++) {
      this.direction[snakeNum] = 0;
      this.lastDirection[snakeNum] = 0;
      this.points[snakeNum] = 0;

      this.snakeBody.push({ x: [], y: [] });
    }

    this.restart();
  },
  methods: {
    // 0 - up, 1 - down, 2 - left, 3 - right
    keyDownHandler: function(event) {
      this.lastDirection[0] = this.direction[0];
      if (event.keyCode == 39 && this.lastDirection[0] != 2) {
        this.direction[0] = 3;
      } else if (event.keyCode == 37 && this.lastDirection[0] != 3) {
        this.direction[0] = 2;
      } else if (event.keyCode == 38 && this.lastDirection[0] != 1) {
        this.direction[0] = 0;
      } else if (event.keyCode == 40 && this.lastDirection[0] != 0) {
        this.direction[0] = 1;
      }
    },

    updateAppleX: function() {
      for (let snakeNum = 0; snakeNum < this.numOfSnakes; snakeNum++) {
        this.appleX[snakeNum] =
          Math.round(
            Math.round(Math.random() * (this.canvas.width - headSizeX)) / 10
          ) * 10;
      }
    },
    updateAppleY: function() {
      for (let snakeNum = 0; snakeNum < this.numOfSnakes; snakeNum++) {
        this.appleY[snakeNum] =
          Math.round(
            Math.round(Math.random() * (this.canvas.height - headSizeY)) / 10
          ) * 10;
      }
    },
    restart: function() {
      this.collision = [];
      for (let snakeNum = 0; snakeNum < this.numOfSnakes; snakeNum++) {
        this.direction[snakeNum] = 0;
        this.collision.push(false);
        this.snakeBody[snakeNum].x[0] = this.canvas.width / 2;
        this.snakeBody[snakeNum].y[0] = this.canvas.height / 2;
        this.snakeBody[snakeNum].x[1] = this.canvas.width / 2;
        this.snakeBody[snakeNum].y[1] = this.canvas.height / 2 - 10;
        this.snakeBody[snakeNum].x[2] = this.canvas.width / 2;
        this.snakeBody[snakeNum].y[2] = this.canvas.height / 2 - 20;
        this.snakeBody[snakeNum].x[3] = this.canvas.width / 2;
        this.snakeBody[snakeNum].y[4] = this.canvas.height / 2 - 30;

        this.snakeColor[snakeNum] = `rgb(${Math.floor(
          Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
          Math.random() * 256
        )}`;
      }

      // random apple position
      this.updateAppleX();
      this.updateAppleY();

      this.draw();
    },
    drawSnake: function() {
      this.ctx.beginPath();
      for (let snakeNum = 0; snakeNum < this.numOfSnakes; snakeNum++) {
        for (let i = 0; i < this.snakeBody[snakeNum].x.length; i++) {
          this.ctx.rect(
            this.snakeBody[snakeNum].x[i],
            this.snakeBody[snakeNum].y[i],
            headSizeX,
            headSizeY
          );
        }
      }
      this.ctx.fillStyle = "black";
      this.ctx.fill();
      this.ctx.closePath();
    },
    drawApple: function() {
      for (let snakeNum = 0; snakeNum < this.numOfSnakes; snakeNum++) {
        this.ctx.beginPath();
        if (this.collision[snakeNum] === false) {
          this.ctx.rect(
            this.appleX[snakeNum],
            this.appleY[snakeNum],
            headSizeX,
            headSizeY
          );
          this.ctx.fillStyle = this.snakeColor[snakeNum];
          this.ctx.fill();
          this.ctx.closePath();
        }
      }
    },
    updateSnakePosition: function() {
      let lastHeadX = [];
      let lastHeadY = [];
      let lastAppleDistance = [];
      let currentAppleDistance = [];

      for (let snakeNum = 0; snakeNum < this.numOfSnakes; snakeNum++) {
        // comment this line when using one snake and keyboard control
        this.direction[snakeNum] = Math.floor(Math.random() * 4);

        lastHeadX = this.snakeBody[snakeNum].x[0];
        lastHeadY = this.snakeBody[snakeNum].y[0];
        lastAppleDistance[snakeNum] = Math.sqrt(
          Math.pow(this.appleX[snakeNum] - this.snakeBody[snakeNum].x[0], 2) +
            Math.pow(this.appleY[snakeNum] - this.snakeBody[snakeNum].y[0], 2)
        );

        if (this.direction[snakeNum] == 3) {
          this.snakeBody[snakeNum].x.unshift(lastHeadX + headDx);
          this.snakeBody[snakeNum].y.unshift(lastHeadY);
        } else if (this.direction[snakeNum] == 2) {
          this.snakeBody[snakeNum].x.unshift(lastHeadX - headDx);
          this.snakeBody[snakeNum].y.unshift(lastHeadY);
        } else if (this.direction[snakeNum] == 0) {
          this.snakeBody[snakeNum].y.unshift(lastHeadY - headDy);
          this.snakeBody[snakeNum].x.unshift(lastHeadX);
        } else if (this.direction[snakeNum] == 1) {
          this.snakeBody[snakeNum].y.unshift(lastHeadY + headDy);
          this.snakeBody[snakeNum].x.unshift(lastHeadX);
        }

        currentAppleDistance[snakeNum] = Math.sqrt(
          Math.pow(this.appleX[snakeNum] - this.snakeBody[snakeNum].x[0], 2) +
            Math.pow(this.appleY[snakeNum] - this.snakeBody[snakeNum].y[0], 2)
        );

        if(currentAppleDistance[snakeNum] < lastAppleDistance[snakeNum]) {
          this.points[snakeNum] += 0.1;
        }
        else {
          this.points[snakeNum] -= 0.2;
        }

        if (
          this.snakeBody[snakeNum].x[0] == this.appleX[snakeNum] &&
          this.snakeBody[snakeNum].y[0] == this.appleY[snakeNum]
        ) {
          this.updateAppleX();
          this.updateAppleY();
          this.points[snakeNum] += 1;
        } else {
          this.snakeBody[snakeNum].x.pop();
          this.snakeBody[snakeNum].y.pop();
        }
      }

      // console.log(this.points);
    },
    checkColision: function() {
      for (let snakeNum = 0; snakeNum < this.numOfSnakes; snakeNum++) {
        if (this.snakeBody[snakeNum].x.length !== 0) {
          for (let i = 3; i < this.snakeBody[snakeNum].x.length; i++) {
            if (
              this.snakeBody[snakeNum].x[i] == this.snakeBody[snakeNum].x[0] &&
              this.snakeBody[snakeNum].y[i] == this.snakeBody[snakeNum].y[0]
            ) {
              this.collision[snakeNum] = true;
              this.points[snakeNum] -= 2;
              this.snakeBody[snakeNum].x = [];
              this.snakeBody[snakeNum].y = [];
            }
          }
        }

        //check collisions with borders
        if (
          this.snakeBody[snakeNum].x[0] > this.canvas.width - headSizeX ||
          this.snakeBody[snakeNum].x[0] < 0 ||
          this.snakeBody[snakeNum].y[0] < 0 ||
          this.snakeBody[snakeNum].y[0] > this.canvas.height - headSizeY
        ) {
          this.collision[snakeNum] = true;
          this.points[snakeNum] = 0;
          this.snakeBody[snakeNum].x = [];
          this.snakeBody[snakeNum].y = [];
        }
      }

      if (
        this.collision.every(item => {
          if (item == true) {
            return true;
          }
        })
      ) {
        this.restart();
      } else {
        // setTimeout(() => {
        requestAnimationFrame(this.draw);
        // }, 100);
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

