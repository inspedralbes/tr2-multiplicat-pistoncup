import { createRouter, createWebHistory } from 'vue-router'
import pantallaJoc from '../views/pantallaJoc.vue'
import landingPage from '../views/landingPage.vue'  
import WaitingRoom from '../views/WaitingRoom.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landingPage',
      component: landingPage
    },
    {
      path: '/pantallaJoc',
      name: 'pantallaJoc',
      component: pantallaJoc
    },
    {
      path: '/WaitingRoom',
      name: 'WaitingRoom',
      component: WaitingRoom
    },
    
  ]
})

export default router
