import { defineStore } from 'pinia';
import axios from 'axios';

interface UserState {
  users: Array<any>;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    users: [],
  }),

  actions: {
    // Action pour récupérer tous les utilisateurs
    async fetchUsers() {
      try {
        console.log('Tentative de récupération des utilisateurs depuis l\'API...');

        // Effectue la requête GET pour récupérer les utilisateurs
        const response = await axios.get('http://localhost:8080/api/users');

        // Log de la réponse pour vérifier que tu reçois bien des données
        console.log('Réponse API:', response);

        if (response.data && Array.isArray(response.data)) {
          // Si la réponse contient des utilisateurs, mets à jour l'état du store
          this.users = response.data;
        } else {
          console.log('Aucun utilisateur trouvé dans la réponse de l\'API');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs', error);

        if (error.response) {
          console.error('Erreur réponse de l\'API:', error.response.data);
          console.error('Statut de l\'erreur:', error.response.status);
        } else if (error.request) {
          console.error('Erreur de requête:', error.request);
        } else {
          console.error('Erreur générale:', error.message);
        }
      }
    },
  },
});
