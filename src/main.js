import { createApp, defineAsyncComponent } from 'vue';
import App from './App.vue';
import router from './router.js';
import store from './Store/store.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/style.css';

import BaseCard from './components/UI/BaseCard.vue';
import BaseButton from './components/UI/BaseButton.vue';
import BaseBadge from './components/UI/BaseBadge.vue';
import BaseSpinner from './components/UI/BaseSpinner.vue';

const BaseModal = defineAsyncComponent(() =>
  import('./components/UI/BaseModal.vue')
);
let app = createApp(App);

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-badge', BaseBadge);
app.component('base-spinner', BaseSpinner);
app.component('base-modal', BaseModal);
app.use(store);
app.use(router);

app.mount('#app');
