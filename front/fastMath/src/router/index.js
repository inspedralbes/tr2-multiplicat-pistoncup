import { createRouter, createWebHistory } from 'vue-router'
import pantallaJoc from '../views/pantallaJoc.vue'
import test from '../views/test.vue'    


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/pantallaJoc',
      name: 'pantallaJoc',
      component: pantallaJoc
    },

    {
      path: '/test',
      name: 'test',
      component: test
    },
    
  ]
})

export default router
