import { createApp } from 'vue'
import App from './App.vue'
import components from '@/components/UI'
import router from '@/routes/router';
import store from '@/store/store';
const app = createApp(App);

components.forEach(component => {
  app.component(component.name, component);
})
app.use(router);
app.use(store)
app.mount('#app');
