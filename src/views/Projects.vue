<template>
    <div class="home">
        <h1 class="greeting">Projects</h1>
    </div>
</template>

<script>
export default {
    name: 'projects',
    data: function() {
        return {
            projectName: [],
            projectDescription: [],
        }
    },
    methods: {
        getProjects: function() {
            for(var i = 0; i < 10; i++) {
                this.projectName[i] = i;
            }
        }
    },
    created: function() {
        this.getProjects();
    }
}
</script>
