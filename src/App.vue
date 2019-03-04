<template>
  <div id="app">
    <h1 class=title>{{name}}</h1>
    <p>{{clicks}}</p>
    <div class=square v-on:click="clicker($event)"></div>
  </div>
</template>

<script>
// import About from './components/About.vue'



export default {
  name: 'app',
  data() {
    return {
      name: "@Przemek Bielak",
      clicks: 0,
    }
  },
  components: {
    // About
  },
  methods: {
    clicker: function(event) {
      console.log(event);
      this.clicks++;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
  /* font-size: 62.5%; */
}

.title {
  font-size: 3.6rem;
}

.square {
  width: 100px;
  height: 100px;
  background-color: black;
}

</style>
