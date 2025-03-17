// src/vuetify.ts
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Styles par défaut de Vuetify

import * as components from 'vuetify/components'; // Importer les composants Vuetify
import * as directives from 'vuetify/directives'; // Importer les directives Vuetify

const vuetify = createVuetify({
  components,
  directives,
});

export default vuetify;
