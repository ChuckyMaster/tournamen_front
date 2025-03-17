<template>
  <v-container class="auth-container d-flex justify-center align-center">
    <v-card class="auth-card pa-6">
      <v-card-title class="text-h5 text-center">Connexion</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleLogin">
          <v-text-field
            v-model="login"
            label="Email"
            type="email"
            variant="outlined"
            color="primary"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Mot de passe"
            type="password"
            variant="outlined"
            color="primary"
            required
          ></v-text-field>

          <v-btn
            type="submit"
            class="btn-primary mt-4"
            block
            rounded
          >
            Se connecter
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const login = ref("");
const password = ref("");

const handleLogin = async () => {
  const success = await authStore.login({
    login: login.value,
    password: password.value,
  });

  if (success) {
    router.push("/my-tournaments");
  } else {
    alert("Échec de connexion. Vérifiez vos identifiants !");
  }
};
</script>

<style lang="scss" scoped>
@import "/src/assets/base.scss";

.auth-container {
  height: 100vh;
  background: linear-gradient(
    135deg,
    var(--primary-light),
    var(--secondary-light)
  );
}

.auth-card {
  max-width: 400px;
  width: 100%;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.btn-primary {
  background-color: var(--primary);
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  padding: 12px 20px;
  transition: background 0.3s ease-in-out;

  &:hover {
    background-color: var(--primary-dark);
  }
}
</style>
