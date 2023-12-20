import { createRouter, createWebHistory } from 'vue-router'
import PokemonList from '../components/PokemonList.vue'
import PokemonInfo from '../components/PokemonInfo.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PokemonList
    },
    {
      path: '/pokemon/:name',
      name: 'pokemon',
      component: PokemonInfo
    }
  ]
})

export default router
