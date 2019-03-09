<template>
    <div class="home">
        <h1 class="greeting">Projects</h1>
        <ul class="main-points">
            <li v-for="project in projects" :key="project.name">
                <a class="info" v-bind:href="project.link">{{project.name}}</a>
            </li>
        </ul>
    </div>
</template>

<script>
const myGithubLink = "https://github.com/przemekBielak/";

export default {
    name: 'projects',
    data: function() {
        return {
            projects: [
                {
                    name: '',
                    link: '',
                    description: ''
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
                        link: myGithubLink + item.name
                    }));
                }
            }.bind(this)
            xmlHttp.open("GET", "https://api.github.com/users/przemekBielak/repos", true);
            xmlHttp.send(null);
        }
    },
    created: function() {
        this.getProjects();
    }
}
</script>
