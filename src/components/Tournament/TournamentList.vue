<template>
  <v-container>
    <!-- 🌟 Bouton "Créer un Tournoi" -->
    <v-btn class="btn-create mb-4 mt-2" @click="openCreateDialog">
      <v-icon left>mdi-plus-circle</v-icon>
      Créer un Tournoi
    </v-btn>

    <!-- 🎴 Liste des Tournois -->
    <v-row>
      <v-col v-for="tournament in tournaments" :key="tournament.id" cols="12" md="6" lg="4">
        <v-card class="tournament-card pa-4">
          <v-card-title class="text-h5 text-center">
            {{ tournament.name }}
          </v-card-title>
          <v-divider></v-divider>

          <v-card-text>
            <p><strong>🗓️ Début :</strong> {{ tournament.dateStart }}</p>
            <p><strong>🏁 Fin :</strong> {{ tournament.dateEnd }}</p>
            <p><strong>👥 Joueurs max :</strong> {{ tournament.maxPlayers }}</p>
            <p><strong>💰 Prix :</strong> {{ tournament.isPaid ? tournament.price + "€" : "Gratuit" }}</p>
          </v-card-text>

          <v-card-actions class="justify-center">
            <v-btn class="btn-edit" @click="editTournament(tournament)">
              <v-icon left>mdi-pencil</v-icon> Modifier
            </v-btn>

            <v-btn class="btn-delete" @click="deleteTournament(tournament.id)">
              <v-icon left>mdi-delete</v-icon> Supprimer
            </v-btn>

            <v-btn v-if="isAuthenticated" class="btn-register" @click="registerForTournament(tournament.id)">
              <v-icon left>mdi-account-plus</v-icon> S'inscrire
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- 📝 MODALE UNIQUE POUR CRÉATION / MODIFICATION -->
    <v-dialog v-model="editDialog" max-width="500px">
      <v-card class="edit-card">
        <v-card-title class="text-center">
          {{ isEditing ? "Modifier le Tournoi" : "Créer un Tournoi" }}
        </v-card-title>
        <v-card-text>
          <v-form ref="tournamentForm">
            <v-text-field v-model="editedTournament.name" label="Nom du tournoi" required></v-text-field>
            <v-text-field v-model="editedTournament.dateStart" label="Date de début" type="date"></v-text-field>
            <v-text-field v-model="editedTournament.dateEnd" label="Date de fin" type="date"></v-text-field>
            <v-checkbox v-model="editedTournament.isPaid" label="Payant"></v-checkbox>
            <v-text-field v-model="editedTournament.price" label="Prix (€)" type="number"></v-text-field>
            <v-text-field v-model="editedTournament.maxPlayers" label="Joueurs max" type="number"></v-text-field>
            <v-text-field v-model="editedTournament.registrationDeadline" label="Date limite d'inscription" type="date"></v-text-field>

            <v-select
              v-model="editedTournament.categoryId"
              :items="categories"
              item-title="name"
              item-value="id"
              label="Catégorie"
              required
            ></v-select>
          </v-form>
        </v-card-text>

        <v-card-actions class="justify-center">
          <v-btn class="btn-save" @click="saveTournament">
            <v-icon left>mdi-content-save</v-icon>
            {{ isEditing ? "Sauvegarder" : "Créer" }}
          </v-btn>
          <v-btn class="btn-cancel" @click="editDialog = false">
            <v-icon left>mdi-close</v-icon> Annuler
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useTournamentStore } from "@/stores/tournamentStore";
import axios from "axios";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const tournamentStore = useTournamentStore();
const { tournaments } = storeToRefs(tournamentStore);
const isAuthenticated = computed(() => authStore.isAuthenticated);
const editDialog = ref(false);
const isEditing = ref(false);
const editedTournament = ref({});
const categories = ref([]);
const { user } = storeToRefs(authStore);



// ✅ Fonction pour ouvrir la boîte de dialogue de création
const openCreateDialog = () => {
  editedTournament.value = {
    name: "",
    dateStart: "",
    dateEnd: "",
    isPaid: false,
    price: 0,
    maxPlayers: 0,
    registrationDeadline: "",
    categoryId: "",
  };
  isEditing.value = false;
  editDialog.value = true;
};

// ✅ Fonction pour ouvrir la boîte de dialogue d'édition
const editTournament = (tournament) => {
  editedTournament.value = { ...tournament };
  isEditing.value = true;
  editDialog.value = true;
};

// ✅ Supprimer un tournoi
const deleteTournament = async (id) => {
  await tournamentStore.deleteTournament(id);
};

// ✅ Enregistrer (créer ou mettre à jour)
const saveTournament = async () => {Q
  if (isEditing.value) {
    await tournamentStore.updateTournament(editedTournament.value.id, editedTournament.value);
  } else {
    await tournamentStore.createTournament(editedTournament.value);
  }
  editDialog.value = false;
};

const registerForTournament = async (tournamentId) => {
  if (!user.value || !user.value.id) {
    alert("❌ Vous devez être connecté pour vous inscrire !");
    return;
  }

  try {
    await tournamentStore.registerUserToTournament(user.value.id, tournamentId);
    alert("✅ Inscription réussie !");
  } catch (error) {
    alert("❌ Erreur lors de l'inscription");
  }
};

// ✅ Charger les tournois et catégories au montage
onMounted(() => {
  tournamentStore.fetchTournaments();
  fetchCategories();
});

// ✅ Récupérer les catégories depuis l'API
const fetchCategories = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/categories");
    categories.value = response.data;
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des catégories", error);
  }
};
</script>

<style lang="scss" scoped>
@import "/src/assets/base.scss";

.tournament-card {
  background: linear-gradient(135deg, var(--primary-light), var(--secondary-light));
  border-radius: 15px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  color: var(--text-primary);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
}

.btn-create {
  background-color: var(--accent);
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 10px;
  padding: 10px 15px;

  &:hover {
    background-color: var(--accent-dark);
  }
}

.btn-edit {
  background-color: var(--primary);
  color: white;
  font-weight: bold;
  border-radius: 10px;
  padding: 8px 12px;

  &:hover {
    background-color: var(--primary-dark);
  }
}

.btn-delete {
  background-color: var(--accent-light);
  color: white;
  font-weight: bold;
  border-radius: 10px;
  padding: 8px 12px;

  &:hover {
    background-color: var(--accent-dark);
  }
}

.btn-register {
  background-color: var(--secondary);
  color: white;
  font-weight: bold;
  border-radius: 10px;
  padding: 8px 12px;

  &:hover {
    background-color: var(--secondary-dark);
  }
}
</style>
