<!-- <template>
    <nav>
        <ul>
            <li><router-link to="/">Accueil (Cave)</router-link></li>
            <li><router-link to="/type/bordeaux">Bordeaux</router-link></li>
            <li><router-link to="/type/bourgogne">Bourgogne</router-link></li>
            <li><router-link to="/type/loire">Loire</router-link></li>
            <li><router-link to="/type/alsace">Alsace</router-link></li>
            <li>
                <router-link to="/type/cote-du-rhone"
                    >Côtes du Rhône</router-link
                >
            </li>
            <li><router-link to="/type/sud-ouest">Sud Ouest</router-link></li>
            <li><router-link to="/type/provence">Provence</router-link></li>
            <li><router-link to="/type/divers">Divers</router-link></li>
            <li><router-link to="/type/etranger">Etranger</router-link></li>
            <li><router-link to="/type/champagne">Champagne</router-link></li>
            <li><router-link to="/type/petillant">Pétillant</router-link></li>
            <li><router-link to="/history">Historique</router-link></li>
        </ul>
    </nav>
</template> -->
<template>
    <nav>
        <ul>
            <li><router-link to="/">Accueil (Cave)</router-link></li>
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
    console.log('NavigationMenu chargé');
</script>

<style scoped>
    nav ul {
        list-style: none;
        padding: 0;
    }

    nav li {
        display: inline-block;
        margin-right: 10px;
    }

    nav li a {
        text-decoration: none;
        color: blue;
    }

    nav li a:hover {
        text-decoration: underline;
    }
</style>
