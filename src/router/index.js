import { createRouter, createWebHistory } from 'vue-router'
import Landing from '../pages/Landing.vue'
import Welcome from '../pages/Welcome.vue'
import Category from '../pages/Category.vue'
import Quiz from '../pages/Quiz.vue'
import Result from '../pages/Result.vue'

const routes = [
  { path: '/', name: 'Landing', component: Landing },
  { path: '/welcome', name: 'Welcome', component: Welcome },
  { path: '/category', name: 'Category', component: Category },
  { path: '/quiz', name: 'Quiz', component: Quiz },
  { path: '/result', name: 'Result', component: Result }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
