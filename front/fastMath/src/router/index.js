import { createRouter, createWebHistory } from 'vue-router'
import pantallaJoc from '../views/pantallaJoc.vue'
import landingPage from '../views/landingPage.vue'  
import WaitingRoom from '../views/WaitingRoom.vue'
import podiumPage from '../views/podiumPage.vue'
import pantallaPrueba from '../views/pantallaPrueba.vue'
import loginPage from '../views/loginPage.vue'


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
    {
      path: '/WaitingRoom',
      name: 'WaitingRoom',
      component: WaitingRoom
    },
    {
      path: '/podiumPage',
      name: 'podiumPage',
      component: podiumPage
    },
    {
      path: '/pantallaPrueba',
      name: 'pantallaPrueba',
      component: pantallaPrueba
    },
    {
      path: '/loginPage',
      name: 'loginPage',
      component: loginPage
    }
  ]
})

export default router
