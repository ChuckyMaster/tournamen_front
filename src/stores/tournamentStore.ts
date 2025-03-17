import { defineStore } from 'pinia';
import axios from 'axios';

interface TournamentState {
  tournaments: Array<any>;
  myTournaments: Array<any>;
}

export const useTournamentStore = defineStore('tournament', {
  state: (): TournamentState => ({
    tournaments: [],
    myTournaments: []
  }),

  actions: {


    async fetchTournaments(): Promise<void> {
      try {
        const response = await axios.get('http://localhost:8080/api/tournaments');
        this.tournaments = response.data;
        console.log('✅ Tournois récupérés:', this.tournaments);
      } catch (error) {
        console.error('❌ Erreur lors de la récupération des tournois', error);
      }
    },

    async fetchUserTournaments(userId: number) {
      try {
        const response = await axios.get(`http://localhost:8080/api/tournaments/user/${userId}`);
        this.myTournaments = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des tournois de l\'utilisateur', error);
      }
    },

    // ✅ Créer un tournoi
    async createTournament(tournamentData: any): Promise<void> {
      try {
        const response = await axios.post('http://localhost:8080/api/tournaments', tournamentData);
        this.tournaments.push(response.data);
        console.log('✅ Tournoi créé:', response.data);
      } catch (error) {
        console.error('❌ Erreur lors de la création du tournoi', error);
      }
    },

    async unregisterUserFromTournament(userId: number, tournamentId: number) {
      try {
        await axios.delete('http://localhost:8080/api/tournaments/unregister', {
          data: { userId, tournamentId }
        });

        // Supprime le tournoi de la liste locale après désinscription
        this.myTournaments = this.myTournaments.filter(t => t.id !== tournamentId);
        console.log('✅ Désinscription réussie');
      } catch (error) {
        console.error('❌ Erreur lors de la désinscription du tournoi', error);
        throw error;
      }
    }
  ,
    // ✅ Mettre à jour un tournoi
async updateTournament(id: number, tournamentData: any): Promise<void> {
  try {
    const response = await axios.put(`http://localhost:8080/api/tournaments/${id}`, tournamentData);

    // Mettre à jour la liste locale après modification
    const index = this.tournaments.findIndex(t => t.id === id);
    if (index !== -1) {
      this.tournaments[index] = response.data;
    }
    console.log('✅ Tournoi mis à jour:', response.data);
  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour du tournoi', error);
  }
}
,

    // ✅ Supprimer un tournoi
    async deleteTournament(id: number): Promise<void> {
      try {
        const response = await axios.delete(`http://localhost:8080/api/tournaments/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // ✅ Ajoute le token si nécessaire
            'Content-Type': 'application/json',
          }
        });
        this.tournaments = this.tournaments.filter(tournament => tournament.id !== id);
        console.log('✅ Tournoi supprimé', response);
      } catch (error) {
        console.error('❌ Erreur lors de la suppression du tournoi', error.response);
      }
    },


    // ✅ Charger les données après un refresh
    hydrateStore(): void {
      if (this.tournaments.length === 0) {
        console.log("♻️ Aucun tournoi en cache, chargement...");
        this.fetchTournaments();
      } else {
        console.log("✅ Tournois déjà chargés, pas besoin de re-fetch.");
      }
    },

    async registerUserToTournament(userId: number, tournamentId: number) {
      try {
        const response = await axios.post("http://localhost:8080/api/tournaments/register", {
          userId: userId,
          tournamentId: tournamentId
        });
        console.log("✅ Inscription réussie :", response.data);
        return response.data;
      } catch (error) {
        console.error("❌ Erreur lors de l'inscription au tournoi", error);
        throw new Error("Erreur d'inscription");
      }
    }


  },
});
