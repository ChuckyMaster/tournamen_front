<script setup lang="ts"></script>

<template>
  <v-footer class="footer">
    <v-container>
      <v-row justify="space-between" align="center">
        <!-- Logo et Nom -->
        <v-col cols="12" md="4" class="d-flex align-items-center">
          <v-icon class="footer-icon">mdi-trophy</v-icon>
          <span class="footer-title">Tournament App</span>
        </v-col>

        <!-- Liens de navigation -->
        <v-col cols="12" md="4" class="text-center">
          <v-btn variant="text" class="footer-link" to="/about">À propos</v-btn>
          <v-btn variant="text" class="footer-link" to="/contact">Contact</v-btn>
          <v-btn variant="text" class="footer-link" to="/terms">Conditions</v-btn>
        </v-col>

        <!-- Réseaux sociaux -->
        <v-col cols="12" md="4" class="d-flex justify-content-end">
          <v-btn icon class="footer-social">
            <v-icon>mdi-facebook</v-icon>
          </v-btn>
          <v-btn icon class="footer-social">
            <v-icon>mdi-twitter</v-icon>
          </v-btn>
          <v-btn icon class="footer-social">
            <v-icon>mdi-instagram</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <!-- Texte de copyright -->
      <v-row justify="center" class="mt-4">
        <span class="footer-text">© 2024 Tournament App - Tous droits réservés</span>
      </v-row>
    </v-container>
  </v-footer>
</template>

<style lang="scss" scoped>
.footer {
  background: linear-gradient(135deg, var(--primary-light), var(--secondary-light));
  color: var(--text-primary);
  padding: 20px 0;
  text-align: center;
  font-size: 14px;
}

.footer-title {
  font-size: 18px;
  font-weight: bold;
  margin-left: 10px;
}

.footer-icon {
  font-size: 24px;
  color: var(--accent);
}

.footer-link {
  font-weight: bold;
  text-transform: uppercase;
  color: var(--text-primary);
  margin: 0 10px;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: var(--primary-dark);
  }
}

.footer-social {
  color: var(--neutral-dark);
  margin: 0 5px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.2);
    color: var(--accent-dark);
  }
}

.footer-text {
  font-size: 12px;
  color: var(--text-secondary);
}
</style>
