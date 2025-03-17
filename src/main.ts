import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // ✅ Styles essentiels de Vuetify
import '@/assets/base.scss'; // ✅ Styles SCSS persos doivent être importés après Vuetify
import '@mdi/font/css/materialdesignicons.css';

import * as components from 'vuetify/components'; // ✅ Import des composants Vuetify
import * as directives from 'vuetify/directives'; // ✅ Import des directives Vuetify

import App from './App.vue';
import router from './router';

const pinia = createPinia();
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
},
});

const app = createApp(App);
app.use(pinia); // ✅ Activer Pinia
app.use(router);
app.use(vuetify); // ✅ Activer Vuetify APRÈS Pinia et Vue Router
app.mount('#app');
