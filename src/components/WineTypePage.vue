<template>
    <div>
        <div class="bg-paper text-ink min-h-screen p-4">
            <h1 class="text-4xl font-serif">Vins de {{ wineType }}</h1>

            <!-- Composant de tri et filtre -->
            <SortAndFilterComponent
                @update-data="updateFilteredAndSortedWines"
            />

            <!-- Tableau des vins -->
            <WineTable
                :wines="filteredAndSortedWines"
                :columns="columnsToDisplay"
                @consume="handleConsume"
                @edit="handleEdit"
                @delete="handleDelete"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed, ref, watch, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import SortAndFilterComponent from '../components/SortAndFilterComponent.vue';
    import WineTable from '../components/WineTable.vue';
    import { Wine } from '../models/Wine';
    import { useWineStore } from '../stores/wineStore';

    // Charger le store
    const wineStore = useWineStore();
    const wines = computed(() => wineStore.wines);

    // Appeler la fonction lors du montage du composant
    onMounted(() => {
        updateFilteredAndSortedWines({
            sortColumn: 'id', // Colonne par défaut pour le tri
            sortOrder: 'desc', // Ordre par défaut
            filterColor: '', // Pas de filtre couleur par défaut
            filterVintage: null, // Pas de filtre millésime par défaut
        });
    });

    // Colonne à afficher
    const columnsToDisplay = [
        'name',
        'appellation',
        'producer',
        'color',
        'vintage',
        'purchaseDate',
        'purchasePrice',
        'bottleSize',
        'quantityBought',
        'quantityLeft',
        'peak',
    ];

    // Actions disponible
    // const availableActions = ['consume', 'edit', 'delete'];

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

    // Fonction pour mettre à jour les données en fonction du tri et des filtres
    const updateFilteredAndSortedWines = ({
        sortColumn,
        sortOrder,
        filterColor,
        filterVintage,
    }: any) => {
        // Créer une copie des données des vins
        let result = [...wines.value];

        // Filtrer les vins par type
        result = result.filter((wine) => wine.wineType === wineType.value);

        // Filtrer les vins avec quantité restante > 0
        result = result.filter((wine) => wine.quantityLeft > 0);

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
                const col = sortColumn as keyof Wine;
                return sortOrder === 'asc'
                    ? (a[col] as number) - (b[col] as number)
                    : (b[col] as number) - (a[col] as number);
            }
        });

        filteredAndSortedWines.value = result;
    };

    // Initialiser avec les vins non triés/filtrés
    filteredAndSortedWines.value = [...winesByType.value];

    function handleConsume(wine: Wine) {
        // wineStore.consume(wine);
    }

    function handleEdit(wine: Wine) {
        // wineStore.edit(wine);
    }

    function handleDelete(wine: Wine) {
        // wineStore.delete(wine);
    }
</script>
