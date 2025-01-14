<template>
    <nav class="navigation-bar">
        <!-- Logo et titre -->
        <div class="logo-container">
            <img src="@/assets/images/logo.png" alt="Logo" class="logo" />
            <span class="app-title">Ma Cave</span>
        </div>

        <!-- Menu de navigation -->
        <ul class="nav-links">
            <li><router-link to="/">Accueil</router-link></li>
            <li
                v-for="[displayName, routeName] in wineTypeMap"
                :key="routeName"
            >
                <router-link :to="'/type/' + routeName">
                    {{ displayName }}
                </router-link>
            </li>
            <li><router-link to="/history">Historique</router-link></li>
        </ul>
    </nav>
</template>

<script setup>
    import { useWineStore } from '../stores/wineStore';
    import { computed } from 'vue';
    const wineStore = useWineStore();
    const wineTypeMap = computed(() =>
        Array.from(wineStore.getWineTypeMap().entries())
    );
</script>

<style scoped>
    /* Navigation bar */
    .navigation-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #3b3b3b; /* Couleur sombre élégante */
        padding: 10px 20px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }

    /* Logo section */
    .logo-container {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .logo {
        height: 40px;
        width: auto;
    }

    .app-title {
        color: #ffffff;
        font-size: 20px;
        font-weight: bold;
        text-transform: uppercase;
    }

    /* Navigation links */
    .nav-links {
        display: flex;
        list-style: none;
        gap: 20px;
        margin: 0;
        padding: 0;
    }

    .nav-links li a {
        text-decoration: none;
        color: #ffffff;
        font-size: 16px;
        transition: color 0.3s ease;
    }

    .nav-links li a:hover {
        color: #e0b67a; /* Effet doré au survol */
    }

    .nav-links li a.router-link-active {
        color: #e0b67a; /* Mettre en valeur la page active */
    }
</style>
