<template>
    <div>
        <h1 class="Title">Super Game in JS</h1>
        x: {{x}}
        y: {{y}}
        <canvas id="canvas" ref="canvasRef" width="480" height="320"></canvas>
    </div>
</template>

<script>

export default {
    name: 'Game',
    data: function() {
        return {
            ballRadius: 10,
            cnvs: '',
        }
    },
    computed: {
        ctx: function() {
            return this.cnvs.getContext("2d")
        },
        x: function() {
            return this.cnvs.height
        },
        y: function() {
            return 5;
        }
    },
    methods: {
        drawBall: function() {
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI*2);
            this.ctx.fillStyle = "blue";
            this.ctx.fill();
            this.ctx.closePath();
        },
        draw: function() {
            this.drawBall();
        },
    },
    created: function() {
        this.cnvs = this.$refs['canvasRef']
        console.log(this.cnvs)
        this.draw();
        requestAnimationFrame(this.draw);
    }
}



</script>

<style>
.Title {
    font-size: 4rem;
}

#canvas {
    background: #eee;
    display: block;
    margin: 0 auto;
}
</style>  
