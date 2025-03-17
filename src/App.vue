<script setup lang="ts">
import { onMounted } from 'vue';
import { useTournamentStore } from '@/stores/tournamentStore';
import { useUserStore } from '@/stores/UserStore';
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';
import TheBanner from "./components/TheBanner.vue";
import { useAuthStore } from '@/stores/authStore';



const tournamentStore = useTournamentStore();
const userStore = useUserStore();
const authStore = useAuthStore();

authStore.checkAuth()

onMounted(() => {
  tournamentStore.hydrateStore();
  userStore.fetchUsers();
  authStore.checkAuth();
});
</script>

<template>
  <v-app>
    <TheHeader class="header b1" />
    <TheBanner
      title="Rejoignez la compétition !"
      subtitle="Des tournois épiques vous attendent."
      image="@/assets/lorcana.png"
      primaryButtonText="Rejoignez-nous ! "
      primaryButtonLink="/register"
    />
    <v-main>
      <router-view />
    </v-main>
    <TheFooter class="footer b4" />
  </v-app>
</template>

