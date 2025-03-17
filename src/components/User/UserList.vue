<template>
  <div>
    <h2>Liste des utilisateurs</h2>
    <button @click="getUsers">Récupérer les utilisateurs</button>

    <!-- Affiche les utilisateurs si la liste n'est pas vide -->
    <ul v-if="users.length > 0">
      <li v-for="user in users" :key="user.id">
        {{ user.name }} - {{ user.email }}
      </li>
    </ul>

    <!-- Message si aucun utilisateur n'est récupéré -->
    <p v-else>Aucun utilisateur trouvé.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from '@/stores/userStore';

export default defineComponent({
  setup() {
    const userStore = useUserStore();

    // Appel à la fonction fetchUsers lors du montage du composant
    const getUsers = async () => {
      console.log('Appel de fetchUsers...');
      await userStore.fetchUsers();
      console.log('Utilisateurs récupérés:', userStore.users); // Log la liste des utilisateurs
    };

    // Appeler fetchUsers au montage du composant
    getUsers();

    return {
      users: userStore.users,
      getUsers,
    };
  },
});
</script>
