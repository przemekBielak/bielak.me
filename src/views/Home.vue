<template>
  <div class="home" v-if="repoName">
    <h1 class="greeting">Hi,</h1>
    <p class="intro">I'm a software developer, who</p>
    <ul class="main-points">
      <li>works at
        <a class="info" v-bind:href="workplaceLink">{{workplace}}</a>
        as
        <a class="info" v-bind:href="linkedinProfileLink">{{workPosition}}</a>
      </li>
      <li>created
        <router-link to="/projects/" class="info" v-bind:href="postLink">these</router-link>
        projects
      </li>
      <li>pushed last commit to
        <a class="info" v-bind:href="commitLink">{{repoName}}</a>
      </li>


    </ul>

    <div class="footer">
      <router-link to="/game/" tag="button" class="footer-button">Game</router-link>
      <button v-on:click="goToGithub" class="footer-button">Github</button>
      <button v-on:click="mailTo" class="footer-button">Contact me</button>

    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data: function() {
    return {
      post: "this post",
      postLink: "https://www.google.com/",
      workplace: "Intive",
      workplaceLink: "https://www.intive.com/",
      linkedinProfileLink: 'https://www.linkedin.com/in/przemys%C5%82aw-bielak-052343122/',
      workPosition: 'Software Engineer',
      repoName: null,
      commitLink: null,
      email: 'przemyslaw.bielak@protonmail.com'
    }
  },
  components: {
  },
  created: function() {
    this.updateGithubInfo();
  },
  methods: {
    goToGithub: function() {
      location.href= "https://github.com/przemekBielak";
    },
    mailTo: function() {
      location.href= "mailto:" + this.email;
    },
    updateGithubInfo: function() {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
          var contentJSON = JSON.parse(xmlHttp.responseText);
          
          for(var event = 0; event < contentJSON.length; event++) {
            if(contentJSON[event].type == "PushEvent") {
              var PayloadMail = contentJSON[event].payload.commits.slice(-1).pop().author.email;
              if (PayloadMail === this.email) {
                this.repoName = contentJSON[event].repo.name;
                this.commitLink = "https://github.com/" + contentJSON[event].repo.name + "/commit/" + contentJSON[event].payload.head;
              }
              break;
            }
          }
        }
      }.bind(this)
      xmlHttp.open("GET", "https://api.github.com/users/przemekBielak/events/public", true);
      xmlHttp.send(null);
    },
  },
}
</script>

<style>
  .home {
    text-align: left;
    max-width: 700px;
    display: inline-block;
  }
  .greeting {
    font-size: 4em;
    /* font-family: 'Eczar', sans-serif; */
  }
  .intro {
    font-size: 2em;
  }
  .main-points {
    font-size: 1.4em;
    list-style-type: none;
    margin-left: 0;
    padding-left: 0;
    list-style-position: outside; 
    list-style-type: none;
  }
  .main-points li {
    padding-top: 10px;
    padding-left: 1em;
    text-indent: -1em;
  }
  .main-points li::before {
    content: "> ";
    padding-right: 5px;
  }
  .info {
    color: #3D9970;
    /* text-decoration: none; */
  }
  li {
    font-size: 1.1em;
  }
  .footer {
    margin-top: 50px;
    width: 100%;
    height: 35px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .footer-button {
    -webkit-appearance: button;
    -moz-appearance: button;
    appearance: button;
    background-color: white;
    border: 1px #3D9970 solid;
    border-radius: 2px;
    text-decoration: none;
    margin-right: 10px;
    outline: none;
    font-size: 1.4em;
  }
  .footer-button:active {
    border-style: outset;
  }
</style>
