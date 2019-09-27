import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Blog from '@/views/Blog.vue'
import Projects from '@/views/Projects.vue'
import Game from '@/views/Game.vue'
import Ml from '@/views/Ml.vue'
import Snake from '@/views/Snake.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/blog/',
      name: 'blog',
      component: Blog
    },
    {
      path: '/projects/',
      name: 'projects',
      component: Projects
    },
    {
      path: '/game/',
      name: 'game',
      component: Game
    },
    {
      path: '/ml/',
      name: 'ml',
      component: Ml
    },
    {
      path: '/snake/',
      name: 'snake',
      component: Snake
    }
  ]
})
