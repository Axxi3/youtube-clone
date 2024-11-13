import { createApp } from 'vue';
import App from './App.vue';
import router from './router/Index';
import './style.css' // Import your router
import NavLayout from './Layouts/NavLayout.vue';

const app = createApp(App);
app.use(router); // Use the router in your app
app.component('NavLayout', NavLayout);

app.mount('#app');
