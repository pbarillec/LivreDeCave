<template>
    <div>
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
                class="mt-4 px-4 py-2 bg-green-500 text-white rounded"
            >
                Ajouter un vin
            </button>

            <!-- Tableau des vins -->
            <WineTable
                :wines="filteredAndSortedWines"
                :columns="columnsToDisplay"
                :actions="availableActions"
                @consume="openConsumeModal"
                @edit="openEditModal"
                @delete="handleDeleteWine"
            />

            <!-- Modale pour consommer un vin -->
            <VueFinalModal
                v-model="isConsumeModalVisible"
                content-class="bg-white p-6 rounded-lg max-w-lg mx-auto"
                overlay-class="bg-black bg-opacity-50"
            >
                <h2 class="text-2xl font-bold mb-4">
                    Consommer : {{ selectedWine?.name }}
                </h2>
                <div v-if="selectedWine">
                    <p class="mb-2">
                        <strong>Appellation :</strong>
                        {{ selectedWine.appellation }}
                    </p>
                    <p class="mb-4">
                        <strong>Quantité restante :</strong>
                        {{ selectedWine.quantityLeft }}
                    </p>
                    <div>
                        <label for="quantity" class="block font-semibold mb-1">
                            Combien de bouteilles voulez-vous consommer ?
                        </label>
                        <input
                            id="quantity"
                            v-model.number="quantityToConsume"
                            type="number"
                            min="1"
                            :max="selectedWine.quantityLeft"
                            class="border border-gray-300 rounded px-2 py-1 w-full"
                        />
                    </div>
                    <div class="mt-4">
                        <label for="comment" class="block font-semibold mb-1">
                            Ajouter un commentaire :
                        </label>
                        <textarea
                            id="comment"
                            v-model="comment"
                            class="border border-gray-300 rounded px-2 py-1 w-full"
                            rows="3"
                            placeholder="Ajouter un commentaire..."
                        ></textarea>
                    </div>
                    <div class="flex justify-end mt-4">
                        <button
                            @click="closeConsumeModal"
                            class="mr-2 px-4 py-2 bg-gray-500 text-white rounded"
                        >
                            Annuler
                        </button>
                        <button
                            @click="handleConsumption"
                            class="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Confirmer
                        </button>
                    </div>
                </div>
            </VueFinalModal>

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
    import { VueFinalModal } from 'vue-final-modal';
    import AddWineModal from './AddWineModal.vue';
    import EditWineModal from './EditWineModal.vue';

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

    // Watch sur les vins du store pooour avoir une mise à jour en temps réel
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

    function handleConsumption() {
        if (!selectedWine.value || quantityToConsume.value <= 0) return;

        if (quantityToConsume.value > selectedWine.value.quantityLeft) {
            alert('Quantité invalide !');
            return;
        }

        selectedWine.value.quantityLeft -= quantityToConsume.value;
        selectedWine.value.quantityDrunk += quantityToConsume.value;
        selectedWine.value.notes = comment.value;

        wineStore.updateWine(selectedWine.value);
        closeConsumeModal();
    }

    // Variables pour la modale d'ajout
    const isAddModalVisible = ref(false);

    function openAddModal() {
        isAddModalVisible.value = true;
    }

    function closeAddModal() {
        isAddModalVisible.value = false;
    }

    function handleAddWine(wine: Wine) {
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
        wineStore.updateWine(wine);

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
