<template>
    <div>
        <div class="bg-paper text-ink min-h-screen p-4">
            <h1 class="text-4xl font-serif">Vins de {{ wineType }}</h1>
            <p>Voici tous les vins de type "{{ wineType }}".</p>

            <!-- Composant de tri et filtre -->
            <SortAndFilterComponent
                @update-data="updateFilteredAndSortedWines"
            />

            <!-- Tableau des vins -->
            <WineTable :wines="filteredAndSortedWines" />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed, ref, watch } from 'vue';
    import { useRoute } from 'vue-router';
    import SortAndFilterComponent from '../components/SortAndFilterComponent.vue';
    import WineTable from '../components/WineTable.vue';
    import { Wine } from '../models/Wine';
    import { useWineStore } from '../stores/wineStore';

    // Charger le store
    const wineStore = useWineStore();
    const wines = computed(() => wineStore.wines);

    // Récupérer le type de vin depuis l'URL
    const route = useRoute();
    const wineType = ref(route.params.type as string);

    // Liste des vins filtrés par type
    const winesByType = computed(() => {
        return wines.value.filter((wine) => wine.wineType === wineType.value);
    });

    // Données triées et filtrées
    const filteredAndSortedWines = ref<Wine[]>([]);

    // Mise à jour dynamique quand le paramètre de l'URL change
    watch(
        () => route.params.type,
        (newType) => {
            wineType.value = newType as string;
            filteredAndSortedWines.value = [...winesByType.value];
        }
    );

    // Mettre à jour la liste après tri/filtrage
    const updateFilteredAndSortedWines = ({
        sortColumn,
        sortOrder,
        filterColor,
        filterVintage,
    }: {
        sortColumn: keyof Wine;
        sortOrder: 'asc' | 'desc';
        filterColor?: string;
        filterVintage?: number;
    }) => {
        let result = [...winesByType.value];

        // Appliquer les filtres
        if (filterColor) {
            result = result.filter((wine) => wine.color === filterColor);
        }
        if (filterVintage) {
            result = result.filter((wine) => wine.vintage === filterVintage);
        }

        // Appliquer le tri
        result.sort((a, b) => {
            if (sortColumn === 'name') {
                return sortOrder === 'asc'
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            } else {
                return sortOrder === 'asc'
                    ? (a[sortColumn] as number) - (b[sortColumn] as number)
                    : (b[sortColumn] as number) - (a[sortColumn] as number);
            }
        });

        filteredAndSortedWines.value = result;
    };

    // Initialiser avec les vins non triés/filtrés
    filteredAndSortedWines.value = [...winesByType.value];
</script>
