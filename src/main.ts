import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import CavePage from "./components/CavePage.vue";

// Définition des routes
const routes = [
  // { path: "/", component: () => import("./components/CavePage.vue") },
  { path: "/", component: CavePage },
  { path: "/type/:type", component: () => import("./components/WineTypePage.vue") },
  { path: "/history", component: () => import("./components/HistoryPage.vue") },
];

// Création du router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Création de l'application Vue
const app = createApp(App);
app.use(router);
app.mount("#app");