<template>
  <div class="home">
    <h1 class="greeting">Hi,</h1>
    <p class="intro">I'm a software developer</p>
    <ul class="main-points">
      <li>Currently working on 
        <a class="info" v-bind:href="workingOnLink">{{workingOn}}</a>
      </li>
      <li>Written this post 
        <a class="info" v-bind:href="postLink">{{post}}</a>
      </li>
      <li>Work in 
        <a class="info" v-bind:href="workplaceLink">{{workplace}}</a>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'home',
  data: function() {
    return {
      workingOn: "this website",
      workingOnLink: "https://www.google.com/",
      post: "this post",
      postLink: "https://www.google.com/",
      workplace: "AVL",
      workplaceLink: "https://www.google.com/",
    }
  },
  components: {
    
  }
}
</script>

<style>
  .home {
    margin-top: 20%;
    text-align: left;
    display: inline-block;
    max-width: 400px;
  }

  .greeting {
    font-size: 3em;
  }

  .intro {
    font-size: 1.6em;
  }

  .main-points {
    font-size: 1.6em;
    list-style-type: none;
    padding-left: 0;
  }

  .main-points li {
    content: "-->";
    padding-top: 10px;
  }

  .main-points li::before {
        content: ">  ";

  }

  .info {
    color: #3D9970;
    text-decoration: none;
  }

</style>

