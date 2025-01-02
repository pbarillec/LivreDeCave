<template>
    <div>
        <button @click="goBack">⬅️ Retour</button>
        <h1>Historique des vins consommés</h1>
        <p>Vous retrouverez ici tous les vins que vous avez consommés.</p>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
    router.back(); // Navigue vers la page précédente
};
</script>