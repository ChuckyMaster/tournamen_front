<template>
  <v-container class="dashboard-container">
    <!-- 👋 Message de bienvenue -->
    <v-card class="welcome-card">
      <v-card-title class="text-h4 text-white text-center">
        Bonjour, {{ user?.name }} 👋
      </v-card-title>
      <v-card-subtitle class="text-white text-center">
        Voici vos tournois inscrits 🎮
      </v-card-subtitle>
    </v-card>

    <v-row class="mt-4">
      <v-col v-for="tournament in myTournaments" :key="tournament.id" cols="12" sm="6" md="4">
        <v-card class="tournament-card">
          <v-card-title class="text-center text-white">
            {{ tournament.name }}
          </v-card-title>
          <v-divider class="divider"></v-divider>
          <v-card-text class="text-white">
            <p>📅 Début : {{ tournament.dateStart }}</p>
            <p>🏁 Fin : {{ tournament.dateEnd }}</p>
            <p>👥 Joueurs max : {{ tournament.maxPlayers }}</p>
            <p>💰 Prix : {{ tournament.price || "Gratuit" }}</p>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn class="btn-unregister" @click="removeFromTournament(tournament.id)">
              <v-icon left>mdi-close-circle</v-icon> Se désinscrire
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted } from "vue";
import { useTournamentStore } from "@/stores/tournamentStore";
import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";

const tournamentStore = useTournamentStore();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const { myTournaments } = storeToRefs(tournamentStore);

onMounted(async () => {
  if (user.value) {
    await tournamentStore.fetchUserTournaments(user.value.id);
  }
});

const removeFromTournament = async (tournamentId) => {
  try {
    await tournamentStore.unregisterUserFromTournament(user.value.id, tournamentId);
    alert("✅ Désinscription réussie !");
  } catch (error) {
    console.error("❌ Erreur lors de la désinscription du tournoi", error);
  }
};
</script>

<style lang="scss" scoped>
@import "/src/assets/base.scss";

.dashboard-container {
  background: linear-gradient(135deg, var(--primary-light), var(--secondary-light));
  min-height: 100vh;
  padding: 30px;
}

.welcome-card {
  background: var(--primary);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.tournament-card {
  background: var(--secondary);
  color: white;
  border-radius: 15px;
  padding: 15px;
  transition: transform 0.3s ease-in-out;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: scale(1.05);
  }
}

.divider {
  background-color: white;
  height: 2px;
}

.btn-unregister {
  background-color: var(--accent-dark);
  color: white;
  font-weight: bold;
  border-radius: 10px;
  padding: 8px 12px;

  &:hover {
    background-color: var(--accent);
  }
}
</style>
