import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/info",
      name: "info",
      component: () => import("../views/InfoView.vue"),
    },
    {
      path: "/coaches",
      name: "coaches",
      component: () => import("../views/CoachesView.vue"),
    },
    {
      path: "/members",
      name: "members",
      component: () => import("../views/MembersView.vue"),
    },
    {
      path: "/resources",
      name: "resources",
      component: () => import("../views/ResourcesView.vue"),
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("../views/ContactView.vue"),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'error',
      component: () => import("../views/ErrorView.vue")
    }
  ],
})

export default router
