<template>
    <div class="home" v-if="projects[0].name">
        <h1 class="greeting">Projects.</h1>
        <ul class="main-points">
            <li v-for="project in projects" :key="project.name">
                <a class="info" v-bind:href="project.link">{{project.name}}</a>
                /{{project.language}}
            </li>
        </ul>
    </div>
</template>

<script>

const myGithubLink = "https://github.com/przemekBielak/";

export default {
    name: 'projects',
    components: {
    },
    data: function() {
        return {
            projects: [
                {
                    name: null,
                    link: null,
                    language: null
                }
            ],
        }
    },
    methods: {
        getProjects: function() {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function() { 
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    var contentJSON = JSON.parse(xmlHttp.responseText);
                    this.projects = contentJSON.map(item => ({
                        name: item.name, 
                        link: myGithubLink + item.name,
                        language: item.languages_url
                    }));
                    for(var i = 0; i < this.projects.length; i++) {
                        this.getProjectsLangs(this.projects[i].language, i);
                    }
                }
            }.bind(this)
            xmlHttp.open("GET", "https://api.github.com/users/przemekBielak/repos", true);
            xmlHttp.send(null);
        },
        getProjectsLangs: function(link, i) {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function() { 
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    var contentJSON = JSON.parse(xmlHttp.responseText);
                    this.projects[i].language = contentJSON;
                }
            }.bind(this)
            xmlHttp.open("GET", link, true);
            xmlHttp.send(null);
        }
    },
    created: function() {
        this.getProjects();
    }
}
</script>
