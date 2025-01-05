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
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed, onMounted } from 'vue';
    import { Wine } from '../models/Wine';
    import SortAndFilterComponent from './SortAndFilterComponent.vue';
    import WineTable from './WineTable.vue';
    import { useWineStore } from '../stores/wineStore';
    import { VueFinalModal } from 'vue-final-modal';

    // Variable de contrôle pour afficher ou cacher la modale
    const wineStore = useWineStore();
    const wines = computed(() => wineStore.wines);

    const isConsumeModalVisible = ref(false);
    const selectedWine = ref<Wine | null>(null);
    const quantityToConsume = ref(1);
    const comment = ref('');

    // Données triées et filtrées
    const filteredAndSortedWines = ref<Wine[]>([...wines.value]);

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
        'quantityBought',
        'quantityLeft',
        'peak',
    ];

    // Actions disponible
    const availableActions = ['consume', 'edit', 'delete'];

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

    // Ouvrir la modal pour consommer
    function openConsumeModal(wine: Wine) {
        selectedWine.value = wine;
        quantityToConsume.value = 1;
        comment.value = wine.notes || ''; // Charger un commentaire existant si présent
        isConsumeModalVisible.value = true;
    }

    // Fermer la modal
    function closeConsumeModal() {
        isConsumeModalVisible.value = false;
        selectedWine.value = null;
    }

    // Confirmer la consommation
    function handleConsumption() {
        if (!selectedWine.value || quantityToConsume.value <= 0) return;

        if (quantityToConsume.value > selectedWine.value.quantityLeft) {
            alert('Quantité invalide !');
            return;
        }

        // Mettre à jour les données
        selectedWine.value.quantityLeft -= quantityToConsume.value;
        selectedWine.value.quantityDrunk += quantityToConsume.value;
        selectedWine.value.notes = comment.value;

        // Mettre à jour le store
        wineStore.updateWine(selectedWine.value);

        console.log(`${quantityToConsume.value} bouteille(s) consommée(s).`);
        closeConsumeModal();
    }

    function handleEdit(wine: Wine) {
        // wineStore.edit(wine);
    }

    function handleDelete(wine: Wine) {
        // wineStore.delete(wine);
    }
</script>
