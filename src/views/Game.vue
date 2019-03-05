<template>
    <div>
        <h1 class="Title">Super Game in JS {{count}}</h1>
        <canvas id="canvas" ref="canvas" width="480" height="320"></canvas>
    </div>
</template>

<script>
import Vue from 'vue';

export default {
    name: 'Game',
    data: function() {
        return {
            count: 0,
        }
    },
    methods: {
        udpateCanvas: function() {
            var c = this.$refs.canvas;
            var ctx = c.getContext("2d");
            ctx.moveTo(0, 0);
            ctx.lineTo(200, 200);
            ctx.stroke();
        },
        draw: function() {
            this.count++;
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
