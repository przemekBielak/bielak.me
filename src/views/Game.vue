<template>
    <div>
        <h1 class="Title">Super Game in JS</h1>
        x: {{x}}
        y: {{y}}
        <canvas id="canvas" ref="canvas" width="480" height="320"></canvas>
    </div>
</template>

<script>
import Vue from 'vue';

export default {
    name: 'Game',
    data: function() {
        return {
            x: 2,
            y: 5,
            ballRadius: 10,
            canvas: this.$refs.canvas,
        }
    },
    computed: {
        ctx: function() {
            return canvas.getContext("2d")
        }
    },
    methods: {
        udpateCanvas: function() {
            this.ctx.moveTo(0, 0);
            this.ctx.lineTo(200, 200);
            this.ctx.stroke();
        },
        draw: function() {
            
        },
    },
    mounted: function() {
        this.udpateCanvas();
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
