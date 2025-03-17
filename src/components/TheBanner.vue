<template>
  <div class="banner">
    <div class="overlay"></div>
    <div class="banner-content">
      <h1>{{ title }}</h1>
      <p>{{ subtitle }}</p>
      <div class="buttons">
        <v-btn class="nav-item" variant="outlined" :to="primaryButtonLink">
          {{ primaryButtonText }}
        </v-btn>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: { type: String, default: "Bienvenue sur Battle Game" },
  subtitle: { type: String, default: "Des tournois épiques vous attendent !" },
  image: { type: String, default: "/lorcana.png" },
  primaryButtonText: { type: String, default: "Rejoindre la communauté " },
  primaryButtonLink: { type: String, default: "/tournois" },

});
</script>

<style lang="scss" scoped>
/* ✅ Style de la bannière */
.banner {
  position: relative;
  width: 100%;
  height: 350px; /* Ajustable */
  background: url("/lorcana.png") center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ✅ Overlay pastel */
.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(179, 157, 219, 0.6); /* 🎨 Pastel Violet clair */
}

/* ✅ Contenu centré */
.banner-content {
  position: absolute;
  text-align: center;
  color: white;
  z-index: 2;
  max-width: 800px;
  padding: 20px;
}

.banner-content h1 {
  font-size: 32px; /* ✅ Taille équilibrée */
  font-weight: bold;
  margin-bottom: 10px;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
}

.banner-content p {
  font-size: 16px;
  margin-bottom: 20px;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
}

/* ✅ Centrage parfait des boutons */
.buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
}

/* ✅ Styles des boutons (repris du header) */
.nav-item {
  font-weight: 500;
  text-transform: uppercase;
  font-size: 14px;
  padding: 10px 20px;
}

/* ✅ Style du bouton "Voir les Tournois" */
.v-btn.outlined {
  color: var(--primary-dark) !important;
  border: 2px solid var(--primary-dark) !important;
}

/* ✅ Style du bouton "Créer un Tournoi" */
.v-btn.tonal {
  background-color: var(--secondary-dark) !important;
  color: white !important;
}
</style>
