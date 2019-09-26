<template>
  <div id="game">
    <canvas id="myCanvas" width="480" height="320"></canvas>
  </div>
</template>

<script>
import router from "../router";

export default {
  name: "game",
  data: function() {
    return {
        gameover: false,
        canvas: 0,
        ctx: 0,
        x: 0,
        y: 0,
        ballRadius: 10,
        dx: 2,
        dy: -2,
        paddleHeight: 10,
        paddleWidth: 75,
        paddleX : 0,
        paddledx: 7,
        points: 0,
        leftPressed: false,
        rightPressed: false,
    };
  },
  mounted: function() {
    // key handlers
    document.addEventListener("keydown", this.keyDownHandler, false);
    document.addEventListener("keyup", this.keyUpHandler, false);

    // initialization
    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height / 2;

    this.paddleX = (this.canvas.width - this.paddleWidth) / 2;

    this.draw();
  },

  methods: {
    keyDownHandler: function(event) {
        if (event.keyCode == 39) {
            this.rightPressed = true;
        } else if (event.keyCode == 37) {
            this.leftPressed = true;
        }
    },

    keyUpHandler: function(event) {
        if (event.keyCode == 39) {
            this.rightPressed = false;
        } else if (event.keyCode == 37) {
            this.leftPressed = false;
        }
    },

    drawPaddle: function() {
        this.ctx.beginPath();
        this.ctx.rect(this.paddleX, this.canvas.height - this.paddleHeight, this.paddleWidth, this.paddleHeight);
        this.ctx.fillStyle = "blue";
        this.ctx.fill();
        this.ctx.closePath();
    },

    drawBall: function() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
        this.ctx.fillStyle = "red";
        this.ctx.fill();
        this.ctx.closePath();
    },

    draw: function() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawBall();
      this.drawPaddle();

      if (this.x + this.dx > this.canvas.width - this.ballRadius || this.x + this.dx < this.ballRadius) {
        this.dx = -this.dx;
      }

      if (this.y + this.dy < this.ballRadius) {
        this.dy = -this.dy;
      } else if (this.y + this.dy > this.canvas.height - this.ballRadius) {
        this.ctx.font = "30px Arial";
        this.ctx.fillText("Score: " + this.points, this.canvas.width / 2, this.canvas.height / 2);

        this.gameover = true;
        this.x = this.canvas.width / 2;
        this.y = this.canvas.height / 2;
        this.points = 0;
      }

      if (this.rightPressed && this.paddleX < this.canvas.width - this.paddleWidth) {
        this.paddleX += this.paddledx;
      } else if (this.leftPressed && this.paddleX > 0) {
        this.paddleX -= this.paddledx;
      }

      if (
        this.x > this.paddleX &&
        this.x < this.paddleX + this.paddleWidth &&
        this.y == this.canvas.height - this.ballRadius - this.paddleHeight
      ) {
        this.points++;
        this.dy = -this.dy;
        console.log(this.points);
      }

      this.x += this.dx;
      this.y += this.dy;

      if (!this.gameover) {
        requestAnimationFrame(this.draw);
      }
      else {
          setTimeout(() => {
              router.push({ path: '/' })
          }, 3000);
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

