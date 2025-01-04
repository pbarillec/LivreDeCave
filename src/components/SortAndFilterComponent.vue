<template>
    <button
        @click="toggleFilters"
        class="bg-blue-500 text-white px-4 py-2 rounded shadow"
    >
        {{ showFilters ? 'Fermer' : 'Filtrer / Trier' }}
    </button>
    <div
        v-if="showFilters"
        class="border border-gray-300 bg-gray-50 p-4 mt-2 rounded"
    >
        <h2 class="text-lg font-bold">Options de tri</h2>
        <label>
            Colonne :
            <select
                v-model="sortColumn"
                class="border border-gray-300 rounded px-2 py-1"
            >
                <option value="name">Nom</option>
                <option value="vintage">Millésime</option>
                <option value="purchasePrice">Prix d'achat</option>
                <option value="quantityLeft">Quantité Restante</option>
            </select>
        </label>
        <div class="mt-2">
            <label>
                <input type="radio" value="asc" v-model="sortOrder" />
                Ascendant
            </label>
            <label class="ml-4">
                <input type="radio" value="desc" v-model="sortOrder" />
                Descendant
            </label>
        </div>

        <h2 class="text-lg font-bold mt-4">Filtres</h2>
        <label>
            Couleur :
            <select
                v-model="filterColor"
                class="border border-gray-300 rounded px-2 py-1"
            >
                <option value="">Toutes</option>
                <option value="Rouge">Rouge</option>
                <option value="Blanc">Blanc</option>
                <option value="Rosé">Rosé</option>
            </select>
        </label>
        <label class="ml-4">
            Millésime :
            <input
                type="number"
                v-model="filterVintage"
                class="border border-gray-300 rounded px-2 py-1"
            />
        </label>

        <button
            @click="resetFilters"
            class="bg-red-500 text-white px-4 py-2 rounded mt-4 ml-2"
        >
            Réinitialiser
        </button>
    </div>
</template>
<script setup lang="ts">
    import { ref, watch } from 'vue';

    // État local des options de tri et de filtre
    const showFilters = ref(false);
    const sortColumn = ref('name');
    const sortOrder = ref('asc');
    const filterColor = ref('');
    const filterVintage = ref<number | null>(null);

    // Méthode pour basculer l'affichage des options
    const toggleFilters = () => {
        showFilters.value = !showFilters.value;
    };

    // Méthode pour réinitialiser les filtres
    const resetFilters = () => {
        filterColor.value = ''; // Réinitialise la couleur
        filterVintage.value = null; // Réinitialise le millésime
        sortColumn.value = 'id'; // Réinitialise la colonne de tri
        sortOrder.value = 'desc'; // Réinitialise l'ordre de tri
    };

    // Émettre les données triées et filtrées
    const emit = defineEmits(['update-data']);
    watch([sortColumn, sortOrder, filterColor, filterVintage], () => {
        emit('update-data', {
            sortColumn: sortColumn.value,
            sortOrder: sortOrder.value,
            filterColor: filterColor.value,
            filterVintage: filterVintage.value,
        });
    });
</script>
