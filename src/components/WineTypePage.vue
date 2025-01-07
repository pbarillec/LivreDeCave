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
                @edit="handleEdit"
                @delete="handleDelete"
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

            <!-- Modale pour ajouter un vin -->
            <VueFinalModal
                v-model="isAddModalVisible"
                content-class="bg-white p-6 rounded-lg max-w-4xl mx-auto"
                overlay-class="bg-black bg-opacity-50"
            >
                <h2 class="text-2xl font-bold mb-6">
                    Ajouter un vin - {{ wineTypeDisplayName }}
                </h2>
                <form @submit.prevent="handleAddWine">
                    <!-- Ligne 1 -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label class="block text-gray-700 font-medium mb-1"
                                >Nom du vin :</label
                            >
                            <input
                                type="text"
                                v-model="newWine.name"
                                class="w-full border-gray-300 rounded px-3 py-2"
                                placeholder="Ex : Château Margaux"
                            />
                        </div>
                        <div>
                            <label class="block text-gray-700 font-medium mb-1"
                                >Appellation :</label
                            >
                            <input
                                type="text"
                                v-model="newWine.appellation"
                                class="w-full border-gray-300 rounded px-3 py-2"
                                placeholder="Ex : Margaux"
                            />
                        </div>
                    </div>

                    <!-- Ligne 2 -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label class="block text-gray-700 font-medium mb-1"
                                >Producteur :</label
                            >
                            <input
                                type="text"
                                v-model="newWine.producer"
                                class="w-full border-gray-300 rounded px-3 py-2"
                                placeholder="Ex : Château Margaux"
                            />
                        </div>
                        <div>
                            <label class="block text-gray-700 font-medium mb-1"
                                >Couleur :</label
                            >
                            <select
                                v-model="newWine.color"
                                class="w-full border-gray-300 rounded px-3 py-2"
                            >
                                <option value="Rouge">Rouge</option>
                                <option value="Blanc">Blanc</option>
                                <option value="Rosé">Rosé</option>
                            </select>
                        </div>
                    </div>

                    <!-- Ligne 3 -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label class="block text-gray-700 font-medium mb-1"
                                >Millésime :</label
                            >
                            <input
                                type="number"
                                v-model="newWine.vintage"
                                class="w-full border-gray-300 rounded px-3 py-2"
                                placeholder="Ex : 2015"
                            />
                        </div>
                        <div>
                            <label class="block text-gray-700 font-medium mb-1"
                                >Date d'achat :</label
                            >
                            <input
                                type="date"
                                v-model="newWine.purchaseDate"
                                class="w-full border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                    </div>

                    <!-- Ligne 4 -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label class="block text-gray-700 font-medium mb-1"
                                >Prix d'achat :</label
                            >
                            <input
                                type="number"
                                step="0.01"
                                v-model="newWine.purchasePrice"
                                class="w-full border-gray-300 rounded px-3 py-2"
                                placeholder="Ex : 25.50"
                            />
                        </div>
                        <div>
                            <label class="block text-gray-700 font-medium mb-1"
                                >Contenance de la bouteille :</label
                            >
                            <input
                                type="number"
                                v-model="newWine.bottleSize"
                                class="w-full border-gray-300 rounded px-3 py-2"
                                placeholder="Ex : 750 (en ml)"
                            />
                        </div>
                    </div>

                    <!-- Ligne 5 -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label class="block text-gray-700 font-medium mb-1"
                                >Quantité achetée :</label
                            >
                            <input
                                type="number"
                                v-model="newWine.quantityBought"
                                class="w-full border-gray-300 rounded px-3 py-2"
                                placeholder="Ex : 6"
                            />
                        </div>
                        <div>
                            <label class="block text-gray-700 font-medium mb-1"
                                >Date de consommation optimale :</label
                            >
                            <input
                                type="date"
                                v-model="newWine.peak"
                                class="w-full border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                    </div>

                    <!-- Boutons -->
                    <div class="flex justify-end gap-4 mt-6">
                        <button
                            type="button"
                            @click="closeAddModal"
                            class="px-6 py-2 bg-gray-400 text-white rounded"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            class="px-6 py-2 bg-blue-600 text-white rounded"
                        >
                            Ajouter
                        </button>
                    </div>
                </form>
            </VueFinalModal>
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
    import { v4 as uuidv4 } from 'uuid';

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
        console.log('Résultat  1 :', result);
        // Appliquer les filtres
        if (filterColor) {
            result = result.filter((wine) => wine.color === filterColor);
            console.log('Résultat 2 :', result);
        }
        if (filterVintage) {
            result = result.filter((wine) => wine.vintage === filterVintage);
            console.log('Résultat 3 :', result);
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
        console.log('Résultat final:', result);
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

    // Modèle pour un nouveau vin
    const newWine = ref<Wine>(
        new Wine(
            0,
            '',
            '',
            '',
            'Rouge',
            0,
            '',
            0,
            0,
            0,
            0,
            '',
            '',
            wineTypeUrl.value,
            0
        )
    );

    function openAddModal() {
        isAddModalVisible.value = true;
    }

    function closeAddModal() {
        isAddModalVisible.value = false;
    }

    // Méthodes
    function handleAddWine() {
        wineStore.addNewWine(newWine.value);

        updateFilteredAndSortedWines({
            sortColumn: 'id',
            sortOrder: 'desc',
            filterColor: '',
            filterVintage: null,
        });

        closeAddModal();
    }

    function handleEdit(wine: Wine) {}
    function handleDelete(wine: Wine) {}
</script>
