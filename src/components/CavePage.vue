<template>
    <div>
        <div class="bg-paper text-ink min-h-screen p-4">
            <h1 class="text-4xl font-serif">Ma Cave</h1>

            <!-- Composant de tri et filtre -->
            <SortAndFilterComponent
                :data="wines"
                @update-data="updateFilteredAndSortedWines"
            />

            <!-- Tableau des vins -->
            <WineTable :wines="filteredAndSortedWines" />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed } from 'vue';
    import { Wine } from '../models/Wine';
    import SortAndFilterComponent from './SortAndFilterComponent.vue';
    import WineTable from './WineTable.vue';
    import { useWineStore } from '../stores/wineStore';

    const wineStore = useWineStore();
    const wines = computed(() => wineStore.wines);

    // Données triées et filtrées
    const filteredAndSortedWines = ref<Wine[]>([...wines.value]);

    // Fonction pour mettre à jour les données en fonction du tri et des filtres
    const updateFilteredAndSortedWines = ({
        sortColumn,
        sortOrder,
        filterColor,
        filterVintage,
    }: any) => {
        let result = [...wines.value];

        // Appliquer les filtres
        if (filterColor)
            result = result.filter((wine) => wine.color === filterColor);
        if (filterVintage)
            result = result.filter((wine) => wine.vintage === filterVintage);

        // Appliquer le tri
        result.sort((a, b) => {
            if (sortColumn === 'name') {
                return sortOrder === 'asc'
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            } else {
                const col = sortColumn as keyof Wine;
                return sortOrder === 'asc'
                    ? (a[col] as number) - (b[col] as number)
                    : (b[col] as number) - (a[col] as number);
            }
        });

        filteredAndSortedWines.value = result;
    };
</script>
