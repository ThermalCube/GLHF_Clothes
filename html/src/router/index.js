import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: { name: 'creator' },
      children: [
        {
          path: 'creator',
          name: 'creator',
          component: () => import("@/views/CharacterCreator.vue")
        }
      ]
    }
  ]
})

export default router
