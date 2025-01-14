import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import './styles/tailwind.css';
import './styles/global.css';
import { createVfm } from 'vue-final-modal';
import 'vue-final-modal/style.css'; // Ajoutez les styles de Vue Final Modal si nécessaire

// Définition des routes
const routes = [
    { path: '/', component: () => import('./components/CavePage.vue') },
    {
        path: '/type/:type',
        component: () => import('./components/WineTypePage.vue'),
    },
    {
        path: '/history',
        component: () => import('./components/HistoryPage.vue'),
    },
];

// Création du router
const router = createRouter({
    history: createWebHistory(),
    routes,
});
// Création de l'application Vue
const app = createApp(App);

app.directive('click-outside', {
    beforeMount(el, binding) {
        el.clickOutsideHandler = (event: { target: any }) => {
            if (!(el === event.target || el.contains(event.target))) {
                binding.value(event);
            }
        };
        document.addEventListener('click', el.clickOutsideHandler);
    },
    unmounted(el) {
        document.removeEventListener('click', el.clickOutsideHandler);
    },
});

// Utilisation de Pinia
app.use(createPinia());
// Utilisation de Vue Final Modal
const vfm = createVfm();
app.use(vfm);
// Utilisation du router
app.use(router);
// Montage de l'application
app.mount('#app');
