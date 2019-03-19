<template>
  <div id="app">
      <router-view/>
  </div>
</template>


<style>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

#app {
  font-family: 'Source Sans Pro', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  font-size: 10px;
}

@media only screen and (min-width: 801px) {
  #app {
    text-align: center;
    margin-top: 20%;
  }
}

@media only screen and (max-width: 800px) {
  #app {
    text-align: center;
    margin-left: 20px;
    margin-right: 20px;
  }
}

</style>
