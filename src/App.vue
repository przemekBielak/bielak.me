<template>
  <div id="app">
      <router-view/>
  </div>
</template>


<style>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
@import url('https://fonts.googleapis.com/css?family=Work+Sans');
@import url('https://fonts.googleapis.com/css?family=Space+Mono');
@import url('https://fonts.googleapis.com/css?family=Rubik');


#app {
  font-family: 'Space Mono', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  font-size: 10px;
}

@media only screen and (min-width: 801px) {
  #app {
    text-align: center;
    margin-top: 10%;
  }
}

@media only screen and (max-width: 800px) {
  #app {
    text-align: left;
    margin-left: 20px;
    margin-right: 20px;
  }
}

@media (prefers-color-scheme: dark) {
  body {
    background-color: black;
    color: #e4e4e4;
  }
}

</style>
