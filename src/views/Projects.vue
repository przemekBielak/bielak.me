<template>
    <div class="home" v-if="loaded">
        <h1 class="greeting">Projects</h1>
        <ul class="main-points">
            <li v-for="project in projects" :key="project.name">
                <a class="info" v-bind:href="project.link">{{project.name}}</a>
                <span v-for="lang in project.languages" :key="lang"> {{lang}} </span>
            </li>
        </ul>
        <p class="remarks">
            <!-- *Information is automatically downloaded using GitHub API. -->
        </p>
    </div>
    <div v-else class="home">
        <h1 class="ascii">{{loadProjectView}}</h1>
    </div>
</template>

<script>

const myGithubLink = "https://github.com/przemekBielak/";
const excludedLanguages = ['Vim script', 'QMake', 'Batchfile', 'Makefile', 'CMake', 'OpenSCAD', 'TeX'];

const ASCIIs = ["—",
				"/",
				"|",
                "\\"];
                
const frequency = 50;

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
                    languageLink: null,
                    languages: []
                }
            ],
            loaded: false,
            counter: 0,
        }
    },
    computed: {
        loadProjectView: function() {
            setTimeout(() => {
                this.counter = (this.counter + 1) % 4;
            }, frequency)
            return ASCIIs[this.counter];
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
                        languageLink: item.languages_url,
                        languages: {}
                    }));
                    for(var i = 0; i < this.projects.length; i++) {
                        this.getProjectsLangs(this.projects[i].languageLink, i);
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

                    var arr = [];
                    for(var key in contentJSON) {
                        if(!excludedLanguages.includes(key)) {
                            arr.push(key);
                        }
                    }
                    this.projects[i].languages = [...arr];

                    // set loaded flag when all projects received github data
                    if(i == this.projects.length - 1) {
                        this.loaded = true;
                    }
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


<style>
.remarks {
    margin-top: 40px;
    font-size: 1.6em;
}

.loading {
    font-size: 1.6em;
}

.ascii {
    font-size: 4em;
    font-weight: bold;
    position: fixed;
    top: 20%;
    left: 50%;
    /* bring your own prefixes */
    transform: translate(-50%, -50%);
}

</style>
