import { createRouter, createWebHistory } from 'vue-router';
import Tournament from '@/components/Tournament/Tournament.vue';
import Match from '@/components/Match/Match.vue';
import Login from "@/components/Auth/Login.vue";
import TournamentList from '@/components/Tournament/TournamentList.vue';
import UserList from '@/components/User/UserList.vue';
import MyTournaments from '@/components/views/MyTournament.vue'
import Register from '@/components/Auth/Register.vue';

const routes = [
  { path: '/', redirect: '/tournois' },
  { path: '/tournois', component: TournamentList },
  { path: '/tournoi/:id', component: Tournament, props: true },
  { path: '/match', component: Match },
  { path: '/login', component: Login },
  { path: '/users', component: UserList },
  {
    path: '/my-tournaments',
    name: 'MyTournaments',
    component: MyTournaments,
    meta: { requiresAuth: true }
  },
  { path: '/register', component: Register}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Define route guard for authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');

  if (to.meta.requiresAuth && !isAuthenticated) {
    // If the route requires authentication and user is not logged in, redirect to login page
    next('/login');
  } else {
    next(); // Otherwise, continue to the route
  }
});




export default router;
