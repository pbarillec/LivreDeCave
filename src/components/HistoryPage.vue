<template>
    <div class="history-page">
        <div class="bg-paper text-ink min-h-screen p-4">
            <h1 class="text-4xl font-serif">Historique des vins consommés</h1>

            <!-- Composant de tri et filtre -->
            <SortAndFilterComponent
                @update-data="updateFilteredAndSortedWines"
            />

            <!-- Tableau des vins -->
            <WineTable
                :wines="filteredAndSortedWines"
                :columns="columnsToDisplay"
                :actions="availableActions"
                @edit="openEditModal"
            />

            <EditHistoryWineModal
                v-model="isEditHistoryModalVisible"
                :selectedWine="selectedWine || ({} as Wine)"
                :on-edit-drunk-wine="handleEditDrunkWine"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed, onMounted, watch } from 'vue';
    import { Wine } from '../models/Wine';
    import SortAndFilterComponent from './SortAndFilterComponent.vue';
    import WineTable from './WineTable.vue';
    import { useWineStore } from '../stores/wineStore';
    import EditHistoryWineModal from './EditHistoryWineModal.vue';

    const wineStore = useWineStore();
    const wines = computed(() => wineStore.wines);
    const selectedWine = ref<Wine | null>(null);

    // Données triées et filtrées
    const filteredAndSortedWines = ref<Wine[]>([...wines.value]);

    // Watch sur les vins du store pour avoir une mise à jour en temps réel
    watch(
        () => wineStore.wines,
        () => {
            updateFilteredAndSortedWines({
                sortColumn: 'id',
                sortOrder: 'desc',
                filterColor: '',
                filterVintage: null,
            });
        },
        { deep: true }
    );

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
        'wineType',
        'color',
        'vintage',
        'purchaseDate',
        'purchasePrice',
        'bottleSize',
        'quantityDrunk',
        'notes',
    ];

    // Actions disponible
    const availableActions = ['edit'];

    // Fonction pour mettre à jour les données en fonction du tri et des filtres
    const updateFilteredAndSortedWines = ({
        sortColumn,
        sortOrder,
        filterColor,
        filterVintage,
    }: any) => {
        // Créer une copie des données des vins
        let result = [...wines.value];

        // Filtrer les vins avec quantité restante > 0
        result = result.filter((wine) => wine.quantityDrunk > 0);

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

    // Variables pour la modale d'édition
    const isEditHistoryModalVisible = ref(false);

    function openEditModal(wine: Wine) {
        selectedWine.value = { ...wine };
        isEditHistoryModalVisible.value = true;
    }

    function closeEditModal() {
        isEditHistoryModalVisible.value = false;
        selectedWine.value = null;
    }

    function handleEditDrunkWine(wine: Wine) {
        wineStore.updateWine(wine);

        updateFilteredAndSortedWines({
            sortColumn: 'id',
            sortOrder: 'desc',
            filterColor: '',
            filterVintage: null,
        });

        closeEditModal();
    }
</script>
