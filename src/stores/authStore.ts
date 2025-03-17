import { defineStore } from "pinia";
import axios from "axios";

interface User {
  id: number;
  pseudonym: string;
  name: string;
  email: string;
  token: string;
  roles: string[];
}


interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
  }),

  actions: {
   
    async register(userData: { pseudonym: string; name: string; email: string; password: string }) {
      try {
        const response = await axios.post("http://localhost:8080/accounts/register", {
          login: userData.pseudonym, // 🔥 Envoi `pseudonym` comme `login`
          name: userData.name,
          email: userData.email,
          password: userData.password,
          totalPoints: 0,
          roles: [{ id: 1, name: "USER" }],
          enabled: true,
          authorities: [{ authority: "USER" }],
          username: userData.email,
          accountNonExpired: true,
          credentialsNonExpired: true,
          accountNonLocked: true,
        });

        console.log("📩 Réponse du backend :", response.data);
        return true; 
      } catch (error) {
        console.error("❌ Erreur lors de l’inscription", error.response ? error.response.data : error);
        return false; 
      }
    },
    async registerForTournament(tournamentId: number, router: any) {
      if (!this.user || !this.user.id) {
        console.error("❌ Impossible de s'inscrire : aucun utilisateur connecté ou ID manquant !");
        return false;
      }

      try {
        const response = await axios.post("http://localhost:8081/api/tournaments/register", {
          userId: this.user.id,
          tournamentId: tournamentId
        });

        console.log("✅ Inscription réussie :", response.data);
        router.push('/my-tournaments');
        return true;
      } catch (error) {
        console.error("❌ Erreur lors de l'inscription au tournoi", error.response ? error.response.data : error);
        return false;
      }
    },

    async login(userData: { login: string; password: string }) {
      try {
        const response = await axios.post("http://localhost:8080/accounts/login", {
          login: userData.login,
          password: userData.password,
        }, {
          headers: { "Content-Type": "application/json" }
        });

        if (response.data && response.data.token) {
          this.user = {
            id: response.data.id,
            name: response.data.name,
            pseudonym: userData.login,
            email: userData.login,
            token: response.data.token,
            roles: []
          };
          this.isAuthenticated = true;

          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(this.user));
          axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
          return true;
        } else {
          throw new Error("Aucun token retourné par l'API !");
        }
      } catch (error) {
        console.error("❌ Erreur lors de la connexion", error.response ? error.response.data : error);
        return false;
      }
    },



    checkAuth() {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");

      if (token && userData) {
        try {
          this.user = JSON.parse(userData);
          this.isAuthenticated = true;
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          console.log("✅ Utilisateur authentifié via localStorage :", this.user);
        } catch (error) {
          console.error("❌ Erreur lors du parsing des données utilisateur :", error);
          this.user = null;
          this.isAuthenticated = false;
          localStorage.removeItem("user"); // Suppression des données corrompues
          localStorage.removeItem("token");
        }
      } else {
        console.warn("⚠️ Aucun utilisateur trouvé dans localStorage !");
      }
    },



    logout() {
      this.user = null;
      this.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user"); 
      delete axios.defaults.headers.common["Authorization"];
      console.log("✅ Déconnexion réussie");
    }

  },
});
