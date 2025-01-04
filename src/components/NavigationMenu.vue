<template>
    <nav>
        <ul>
            <li><router-link to="/">Accueil (Cave)</router-link></li>
            <li><router-link to="/type/Bordeaux">Bordeaux</router-link></li>
            <li><router-link to="/type/Bourgogne">Bourgogne</router-link></li>
            <li><router-link to="/history">Historique</router-link></li>
        </ul>
    </nav>
</template>

<script setup>
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
