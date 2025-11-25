<template>
    <div class="wine-type-page">
        <div class="bg-paper text-ink min-h-screen p-4">
            <h1 class="text-4xl font-serif">
                Vins de {{ wineTypeDisplayName }}
            </h1>

            <!-- Composant de tri et filtre -->
            <SortAndFilterComponent
                @update-data="updateFilteredAndSortedWines"
            />

            <!-- Bouton pour ouvrir la modale d'ajout de vin -->
            <button
                @click="openAddModal"
                class="p-2 rounded shadow bg-gray-200 hover:bg-gray-300"
                title="Ajouter un vin"
            >
                <PlusIcon class="w-5 h-5 text-black" />
            </button>

            <!-- Conteneur du tableau avec scroll -->
            <div class="table-container">
                <!-- Tableau des vins -->
                <WineTable
                    :wines="filteredAndSortedWines"
                    :columns="columnsToDisplay"
                    :actions="availableActions"
                    @consume="openConsumeModal"
                    @edit="openEditModal"
                    @delete="handleDeleteWine"
                />
            </div>

            <DrinkWineModal
                v-model="isConsumeModalVisible"
                :selectedWine="selectedWine || ({} as Wine)"
                :quantityToConsume="quantityToConsume"
                :comment="comment"
                :on-consume-wine="handleConsumption"
            />

            <EditWineModal
                v-model="isEditModalVisible"
                :selectedWine="selectedWine || ({} as Wine)"
                :on-edit-wine="handleEditWine"
            />

            <AddWineModal
                v-model="isAddModalVisible"
                :wine-type-display-name="wineTypeDisplayName"
                :wine-type-url="wineTypeUrl"
                :on-add-wine="handleAddWine"
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
    import AddWineModal from './AddWineModal.vue';
    import EditWineModal from './EditWineModal.vue';
    import DrinkWineModal from './DrinkWineModal.vue';
    import { PlusIcon } from '@heroicons/vue/24/solid';

    // Charger le store
    const wineStore = useWineStore();
    const route = useRoute();

    // Obtenir la map des types de vin depuis le store
    const wineTypeMap = wineStore.getWineTypeMap();

    // Obtenir le type de vin depuis l'URL-friendly string
    const wineTypeUrl = computed(() => route.params.type as string);
    const wineTypeDisplayName = computed(
        () =>
            Array.from(wineTypeMap.keys()).find(
                (key) => wineTypeMap.get(key) === wineTypeUrl.value
            ) || ''
    );

    // Liste des vins triés et filtrés
    const wines = computed(() => wineStore.wines);
    const winesByType = computed(() => {
        return wines.value.filter(
            (wine) => wine.wineType === wineTypeUrl.value
        );
    });

    const filteredAndSortedWines = ref<Wine[]>([]);

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

    // Actions disponibles
    const availableActions = ['consume', 'add', 'edit', 'delete'];

    // Watch sur le type de vin (route.params.type)
    watch(
        () => wineTypeUrl.value,
        () => {
            updateFilteredAndSortedWines({
                sortColumn: 'id',
                sortOrder: 'desc',
                filterColor: '',
                filterVintage: null,
            });
        }
    );

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

    // Initialiser les vins filtrés
    onMounted(() => {
        updateFilteredAndSortedWines({
            sortColumn: 'id',
            sortOrder: 'desc',
            filterColor: '',
            filterVintage: null,
        });
    });

    // Fonction pour mettre à jour les données triées et filtrées
    const updateFilteredAndSortedWines = ({
        sortColumn,
        sortOrder,
        filterColor,
        filterVintage,
    }: any) => {
        let result = [...winesByType.value];

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

    // Variables pour la modale de consommation
    const isConsumeModalVisible = ref(false);
    const selectedWine = ref<Wine | null>(null);
    const quantityToConsume = ref(1);
    const comment = ref('');

    function openConsumeModal(wine: Wine) {
        selectedWine.value = wine;
        quantityToConsume.value = 1;
        comment.value = wine.notes || '';
        isConsumeModalVisible.value = true;
    }

    function closeConsumeModal() {
        isConsumeModalVisible.value = false;
        selectedWine.value = null;
    }

    function handleConsumption(quantityToConsume: number, comment: string) {
        if (!selectedWine.value || quantityToConsume <= 0) return;

        if (quantityToConsume > selectedWine.value.quantityLeft) {
            alert('Quantité invalide !');
            return;
        }

        selectedWine.value.quantityLeft -= quantityToConsume;
        selectedWine.value.quantityDrunk += quantityToConsume;
        selectedWine.value.notes = comment;

        wineStore.consumeWine(selectedWine.value);
        closeConsumeModal();
    }

    // Variables pour la modale d'ajout
    const isAddModalVisible = ref(false);
    const addWineErrors = ref<string[]>([]);

    function openAddModal() {
        isAddModalVisible.value = true;
        addWineErrors.value = []; // Réinitialise les erreurs
    }

    function closeAddModal() {
        isAddModalVisible.value = false;
        addWineErrors.value = [];
    }

    function validateWine(wine: Wine): boolean {
        const errors: string[] = [];
        if (!wine.name.trim()) errors.push('Le nom du vin est requis.');
        if (!wine.appellation.trim()) errors.push("L'appellation est requise.");
        if (!wine.producer.trim()) errors.push('Le producteur est requis.');
        if (!wine.purchaseDate.trim())
            errors.push("La date d'achat est requise.");

        addWineErrors.value = errors;
        return errors.length === 0;
    }

    function handleAddWine(wine: Wine) {
        if (!validateWine(wine)) {
            return; // Bloque si des erreurs existent
        }
        wineStore.addNewWine(wine);

        updateFilteredAndSortedWines({
            sortColumn: 'id',
            sortOrder: 'desc',
            filterColor: '',
            filterVintage: null,
        });

        closeAddModal();
    }

    // Variables pour la modale d'édition
    const isEditModalVisible = ref(false);

    function openEditModal(wine: Wine) {
        selectedWine.value = { ...wine };
        isEditModalVisible.value = true;
    }

    function closeEditModal() {
        isEditModalVisible.value = false;
        selectedWine.value = null;
    }

    function handleEditWine(wine: Wine) {
        wineStore.editWine(wine);

        updateFilteredAndSortedWines({
            sortColumn: 'id',
            sortOrder: 'desc',
            filterColor: '',
            filterVintage: null,
        });

        closeEditModal();
    }

    function handleDeleteWine(wine: Wine) {
        wineStore.deleteWine(wine.id);
        updateFilteredAndSortedWines({
            sortColumn: 'id',
            sortOrder: 'desc',
            filterColor: '',
            filterVintage: null,
        });
    }
</script>
<style scoped>
    .wine-page-container {
        display: flex;
        flex-direction: column;
        height: 100vh; /* Hauteur totale de la fenêtre */
        overflow: hidden; /* Empêche tout défilement global */
    }

    .table-container {
        flex: 1; /* Prend l'espace restant après l'en-tête */
        overflow-y: auto; /* Permet le défilement vertical uniquement dans ce conteneur */
        margin-top: 10px;
    }
</style>
