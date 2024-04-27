import Vue from 'vue';
import App from './App.vue';
import router from './router'; // Import the router configuration

Vue.config.productionTip = false;

new Vue({
  router, // Integrate the router with Vue
  render: (h) => h(App), // Render the App component
}).$mount('#app'); // Mount the Vue instance to the DOM
