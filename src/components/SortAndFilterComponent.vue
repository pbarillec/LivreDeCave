<template>
    <div class="sort-and-filter">
        <slot name="filter-button">
            <button
                @click="toggleFilters"
                class="p-2 rounded shadow bg-gray-200 hover:bg-gray-300"
                title="Filtrer / Trier"
            >
                <FunnelIcon class="w-5 h-5 text-black" />
            </button>
        </slot>
        <div
            v-if="showFilters"
            class="border border-gray-300 bg-gray-50 p-4 mt-2 rounded filters-panel"
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
                    <option value="purchasePrice">Prix unitaire</option>
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
    </div>
</template>
<script setup lang="ts">
    import { ref, watch } from 'vue';
    import { FunnelIcon } from '@heroicons/vue/24/solid';

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
<style scoped>
    .sort-and-filter {
        margin-bottom: 1rem;
    }
    .filters-panel {
        border: 1px solid #d1d5db;
        padding: 1rem;
        border-radius: 0.375rem;
        background-color: #f3f4f6;
    }
</style>
