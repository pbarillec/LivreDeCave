<template>
    <div>
        <button @click="goBack">⬅️ Retour</button>
        <h1>Vins de type : {{ type }}</h1>
        <p>Voici la liste des vins de ce type (à venir).</p>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const type = ref(route.params.type);

const goBack = () => {
    router.back(); // Navigue vers la page précédente
};
</script>
