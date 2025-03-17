<template>
  <v-container class="auth-container d-flex justify-center align-center">
    <v-card class="auth-card pa-6">
      <v-card-title class="text-h5 text-center">Inscription</v-card-title>
      <v-divider class="my-3"></v-divider>
      <v-card-text>
        <v-form @submit.prevent="handleRegister">
          <v-text-field
            v-model="pseudonym"
            label="Pseudonyme"
            variant="outlined"
            color="primary"
            prepend-icon="mdi-account"
            required
          ></v-text-field>

          <v-text-field
            v-model="name"
            label="Nom"
            variant="outlined"
            color="primary"
            prepend-icon="mdi-card-account-details"
            required
          ></v-text-field>

          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            variant="outlined"
            color="primary"
            prepend-icon="mdi-email"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Mot de passe"
            type="password"
            variant="outlined"
            color="primary"
            prepend-icon="mdi-lock"
            required
          ></v-text-field>

          <v-btn
            type="submit"
            class="btn-primary mt-4"
            block
            rounded
          >
            S'inscrire
          </v-btn>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="d-flex justify-center mt-2">
        <v-btn class="btn-secondary" to="/login">Déjà un compte ? Connectez-vous</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const pseudonym = ref("");
const name = ref("");
const email = ref("");
const password = ref("");

const handleRegister = async () => {
  const success = await authStore.register({
    pseudonym: pseudonym.value,
    name: name.value,
    email: email.value,
    password: password.value,
  });

  if (success) {
    router.push("/login");
  } else {
    alert("❌ Erreur lors de l'inscription. Vérifiez vos informations !");
  }
};
</script>

<style lang="scss" scoped>
@import "/src/assets/base.scss";

.auth-container {
  height: 100vh;
  background: linear-gradient(135deg, var(--primary-light), var(--secondary-light));
}

.auth-card {
  max-width: 420px;
  width: 100%;
  border-radius: 20px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  background: white;
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

.btn-secondary {
  background-color: transparent;
  color: var(--primary-dark);
  font-weight: bold;
  text-transform: uppercase;

  &:hover {
    color: var(--primary);
  }
}
</style>
