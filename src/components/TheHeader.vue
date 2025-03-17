<template>
  <v-app-bar app flat class="header">
    <v-container class="d-flex align-center">
      <!-- 🏠 Bouton Home -->
      <v-btn icon class="btn-home" @click="navigateTo('/')">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <span class="logo ml-3">🎮 Battle Game</span>

      <v-spacer />

      <!-- 📜 Menu Desktop -->
      <div class="d-none d-md-flex">
        <v-btn class="nav-item" @click="navigateTo('/tournois')">
          <v-icon left>mdi-trophy</v-icon> Tournois
        </v-btn>
        <v-btn class="nav-item" @click="navigateTo('/match')">
          <v-icon left>mdi-cards-outline</v-icon> Match
        </v-btn>
        <v-btn v-if="isAuthenticated" class="btn-primary" @click="router.push('/my-tournaments')">
          <v-icon left>mdi-sword-cross</v-icon> Mes Tournois
        </v-btn>
      </div>

      <v-spacer />

      <!-- 🛡️ Connexion / Utilisateur -->
      <div class="d-none d-md-flex">
        <template v-if="isAuthenticated">
          <span class="user-name">👤 {{ userName }}</span>
          <v-btn class="btn-logout" @click="logout">
            <v-icon left>mdi-logout</v-icon> Déconnexion
          </v-btn>
        </template>
        <template v-else>
          <v-btn class="btn-login" @click="navigateTo('/login')">
            <v-icon left>mdi-login</v-icon> Connexion
          </v-btn>
          <v-btn class="btn-register" @click="navigateTo('/register')">
            <v-icon left>mdi-account-plus</v-icon> Inscription
          </v-btn>
        </template>
      </div>

      <!-- 📱 Menu Mobile -->
      <v-btn icon class="d-md-none" @click="mobileMenu = !mobileMenu">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-container>

    <!-- 📋 Drawer Menu Mobile -->
    <v-navigation-drawer v-model="mobileMenu" temporary right>
      <v-list>
        <v-list-item @click="navigateTo('/tournois')">
          <v-icon left>mdi-trophy</v-icon> Tournois
        </v-list-item>
        <v-list-item @click="navigateTo('/match')">
          <v-icon left>mdi-cards-outline</v-icon> Match
        </v-list-item>
        <v-list-item v-if="isAuthenticated" @click="navigateTo('/my-tournaments')">
          <v-icon left>mdi-sword-cross</v-icon> Mes Tournois
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <template v-if="isAuthenticated">
          <v-list-item>
            👤 {{ userName }}
          </v-list-item>
          <v-list-item @click="logout">
            <v-icon left>mdi-logout</v-icon> Déconnexion
          </v-list-item>
        </template>
        <template v-else>
          <v-list-item @click="navigateTo('/login')">
            <v-icon left>mdi-login</v-icon> Connexion
          </v-list-item>
          <v-list-item @click="navigateTo('/register')">
            <v-icon left>mdi-account-plus</v-icon> Inscription
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
  </v-app-bar>
</template>

---


<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const router = useRouter();
const authStore = useAuthStore();

const isAuthenticated = computed(() => authStore.isAuthenticated);
const userName = computed(() => authStore.user?.name || "");

const mobileMenu = ref(false); // ✅ Menu mobile

const logout = () => {
  authStore.logout();
  router.push('/login');
};

const navigateTo = (route) => {
  router.push(route);
  mobileMenu.value = false; // ✅ Fermer le menu mobile après navigation
};
</script>
<style lang="scss" scoped>
@import "/src/assets/base.scss";

.header {
  background: linear-gradient(135deg, var(--primary-light), var(--secondary-light));
  padding: 10px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--text-primary);
}

.nav-item {
  font-weight: bold;
  color: var(--text-primary);
  border-radius: 10px;
  transition: all 0.3s ease-in-out;
  padding: 8px 16px;

  &:hover {
    background-color: var(--neutral-light);
  }
}

.btn-primary {
  background-color: var(--primary);
  color: white;
  font-weight: bold;
  border-radius: 10px;
  padding: 8px 12px;

  &:hover {
    background-color: var(--primary-dark);
  }
}

.btn-login {
  background-color: var(--secondary);
  color: white;
  font-weight: bold;
  border-radius: 10px;
  padding: 8px 12px;

  &:hover {
    background-color: var(--secondary-dark);
  }
}

.btn-register {
  background-color: var(--accent);
  color: white;
  font-weight: bold;
  border-radius: 10px;
  padding: 8px 12px;

  &:hover {
    background-color: var(--accent-dark);
  }
}

.btn-logout {
  background-color: var(--neutral-dark);
  color: white;
  font-weight: bold;
  border-radius: 10px;
  padding: 8px 12px;

  &:hover {
    background-color: var(--neutral);
  }
}

.user-name {
  color: white;
  font-weight: bold;
  margin-right: 10px;
}

.btn-home {
  color: white;
  font-size: 1.2rem;
}
</style>

