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
            x: 0,
            y: 0,
        }
    },
    computed: {
    },
    methods: {

    },
    mounted: function() {
        let cnvs, ctx
        cnvs = this.$refs['canvasRef'];
        ctx = cnvs.getContext('2d');
        this.x = 5;
        this.y = 10;

        function drawBall () {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI*2);
            ctx.fillStyle = "blue";
            ctx.fill();
            ctx.closePath();
        }
        function draw () {
            drawBall();
        }


        draw();
        requestAnimationFrame(draw);
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
