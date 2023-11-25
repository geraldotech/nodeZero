import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Templatefront from '../views/Template-front.vue'
import Templateback from '../views/Template-back.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/posts',
    component: () => import('../views/Posts.vue'),
  },
  // component to render post body....
  {
    path: '/posts/:id',
    name: 'templatefront',
    component: Templatefront,
  },
  {
    path: '/posts/:id',
    name: 'templatebackend',
    component: Templateback,
  },
]

const router = new VueRouter({
  routes,
})

export default router
