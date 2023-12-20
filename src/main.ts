import "@mdi/font/css/materialdesignicons.css";
import "@fortawesome/fontawesome-free/css/all.css";

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import { fa } from 'vuetify/iconsets/fa';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
      fa,
    },
  },
});

const app = createApp(App);

const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(vuetify);

app.mount('#app');