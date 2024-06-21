import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";
import 'primevue/resources/themes/lara-light-blue/theme.css'

createApp(App).use(PrimeVue).component('InputNumber',InputNumber).component('Button',Button).mount('#app')
