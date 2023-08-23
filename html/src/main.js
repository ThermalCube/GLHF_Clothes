import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import axios from './plugins/axios';

import App from './App.vue';
import router from './router';

library.add(fas, far);

const app = createApp(App)
const pinia = createPinia();



app.component("fa", FontAwesomeIcon)

app.use(axios);
app.use(pinia)
app.use(router)

app.mount('#app')
